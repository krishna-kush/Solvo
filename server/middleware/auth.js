import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer token
        const isCustomAuth = token.length < 500; // if token is less than 500 then it is custom auth token, else google oauth token

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'secret');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; // sub is google's name for unique id it provides to every google user
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;