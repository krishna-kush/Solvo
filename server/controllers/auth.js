import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library'

// import User from '../models/user.js';
import UserGoogle from '../models/UserGoogle.js';
import User from '../models/User.js';

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
        const { _id, source } = req.body;

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
        
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exists" });

        const isPasswordCorrect = password == existingUser.password;

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, 'secret', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists" });

        const result = await User.create({ email, password, name: `${firstName} ${lastName}` });

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, 'secret', { expiresIn: "1h" });

        res.status(200).json({ result, token });
        
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
        const { name, email, picture } = ticket.getPayload();
        // console.log(ticket.getPayload());

        let user = await UserGoogle.findOneAndUpdate(
            { email: email },
            // { token: token },
            {returnOriginal: false}, // without it you will get the original document means before updated value...
        );


        if (user==null) {
            console.log("not found");
            const data = {
                name: name,
                email: email,
                picture: picture,
            }
            UserGoogle.create(data)
            
            user = await UserGoogle.findOne({ email: email });
            
        }else {
            console.log("found");
            // console.log(user);
            // res.status(200).json(userList);
        }

        // console.log(user);

        res.status(200).json(user);


        // Fetch token for perticuler IP, Multiple token can exist for multiple divices
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}