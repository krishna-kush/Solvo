import { OAuth2Client } from 'google-auth-library'

// import User from '../models/user.js';
import UserGoogle from '../models/userGoogle.js';

// export const getUser = async (req, res) => { 
//     try {
//         const userList = await User.find();
                
//         res.status(200).json(userList);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// export const createUser = async (req, res) => {
//     try {
//         // create token for this user append it in the body
//         const token = () => {
//             return 0
//         }

//         // encrypt password
//         const enc_password = req.body.password

//         console.log('comming');
//         console.log(req.body);


//         const data = {
//             email: req.body.email,
//             password: enc_password,
//             token: token()
//         }
//         User.create(data)
//         // Fetch token for perticuler IP, Multiple token can exist for multiple divices
        
//     } catch (error) {
        
//     }
// }

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
            { token: token },
            {returnOriginal: false}, // without it you will get the original document means before updated value...
        );


        if (user==null) {
            console.log("not found");
            const data = {
                name: name,
                email: email,
                picture: picture,
                token: token
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