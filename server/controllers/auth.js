import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library'

// import User from '../models/user.js';
import UserGoogle from '../models/UserGoogle.js';
import User from '../models/User.js';
import Following from '../models/Following.js';

// export const getUser = async (req, res) => { 
//     try {
//         const userList = await User.find();
                
//         res.status(200).json(userList);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const who = async (req, res) => {
    try {
        let { _id, source } = req.body;

        const desiredFields = ['name', 'email', 'photo']
        let existingUser;
        
        if (source=='google') {
            source = 'UserGoogle';
        } else if (source=='own') {
            source = 'User';
        }
        
        if (source==='UserGoogle') {
            existingUser = await UserGoogle.findOne({ _id })
            .select(desiredFields.join(' '));
        } else {
            existingUser = await User.findOne({ _id })
            .select(desiredFields.join(' '));
        }

        res.status(200).json({
            _id: _id,
            result: existingUser
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const existingUser = await User.findOne({ email })
        .populate({path: 'following'})

        if(!existingUser) return res.status(404).json({ message: "User doesn't exists" });

        const isPasswordCorrect = password == existingUser.password;

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({
            _id: existingUser._id,
            // email: existingUser.email,
            // name: existingUser.name,
        }, 'secret', { expiresIn: "2d" });

        console.log('token');

        res.status(200).json({ token, result: { _id: existingUser._id, email: existingUser.email, name: existingUser.name, following: existingUser.following, source: 'own' }});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const ifLogIn = async (req, res) => {
    try {
        // console.log('ifLogIn', req.userId, req.source);
        const _id = req.userId;
        const source = req.source;
        let existingUser;

        const desiredFields = ['_id', 'name', 'email', 'photo', 'following', 'postsCount']

        if (source=='google') {
            existingUser = await UserGoogle.findOne({ googleId: _id })
            .select(desiredFields.join(' '))
            .populate({path: 'following'})
        } else if (source=='own') {
            existingUser = await User.findOne({ _id })
            .select(desiredFields.join(' '))
            .populate({path: 'following'})
        }
        existingUser = { ...existingUser._doc, source: source }; // ...existingUser._doc is because if I don't spread it and only send it, mongoose will automatically send the _doc object but if spread it'll send the whole mongoose object containing _doc and other stuff like functions and inicializations
        // console.log(existingUser.following);
        if(!existingUser) return res.status(404).json({ message: "User doesn't exists" });

        // console.log('sending');

        res.status(200).json({ result: existingUser});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signUp = async (req, res) => {
    try {
        const { email, password, photo, firstName, lastName } = req.body;
        
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists" });

        const NewFollowing = await Following.create({});

        const result = await User.create({ email, password, photo, name: `${firstName} ${lastName}`, following: NewFollowing._id });

        const token = jwt.sign({
            _id: result._id,
            email: result.email,
            name: result.name,
        }, 'secret', { expiresIn: "1h" });

        res.status(200).json({ token, result: { _id: result._id, email: result.email, photo: result.photo, name: result.name, following: NewFollowing, source: 'own' } });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const google = async (req, res) => {
    try {
        const token = req.body.credential;
        const clientId  = req.body.clientId;
        
        const client = new OAuth2Client(clientId);        
                
        const ticket = await client.verifyIdToken({
            idToken: token,
            // audience: clientId
        });
        const { sub, name, email, picture } = ticket.getPayload();
        // console.log(ticket.getPayload());

        // let user = await UserGoogle.findOneAndUpdate(
        //     { email: email },
        //     // { token: token },
        //     {returnOriginal: false}, // without it you will get the original document means before updated value...
        // );
        let user = await UserGoogle.findOne({ googleId: sub })
        .populate({path: 'following'});


        if (user==null) {
            console.log("not found google user");

            const NewFollowing = await Following.create({});

            const data = {
                googleId: sub,
                name: name,
                email: email,
                photo: picture,
                following: NewFollowing,
            }
            // const data = {
            //     id: ticket.getUserId(),
            // }
            await UserGoogle.create(data)
            
            user = await UserGoogle.findOne({ googleId: sub })
            .populate({path: 'following'});            
        }else {
            console.log("found");
            // console.log(user);
            // res.status(200).json(userList);
        }

        // console.log(user);

        res.status(200).json({token, result: { ...user._doc, source: 'google'}});


        // Fetch token for perticuler IP, Multiple token can exist for multiple divices
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}