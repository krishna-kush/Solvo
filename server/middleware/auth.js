import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ') || !authHeader?.split(" ")[1] || authHeader?.split(" ")[1]==='null') {
        return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split(" ")[1]; // Bearer token
        const isCustomAuth = token.length < 500; // if token is less than 500 then it is custom auth token, else google oauth token

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'secret');

            req.userId = decodedData?._id;
            req.source = 'own'
        } else {
            decodedData = jwt.decode(token);
            
            req.userId = decodedData?.sub; // sub is google's name for unique id it provides to every google user
            req.source = 'google'
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export default auth;