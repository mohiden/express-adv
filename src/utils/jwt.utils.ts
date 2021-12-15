import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export  function signJwt(payload: Object, options?: jwt.SignOptions, type?: "public" | "private") {
   return jwt.sign(payload, type ? privateKey : publicKey, {...(options && options)}); 
}
export function verifyJwt(token: string, type?: "public" | "private") {
    try {
    const decoded = jwt.verify(token, type ? privateKey : publicKey);
    return {
        valid: true,
        expired: false,
        decoded
    }
    } catch (e) {
        
    return {
        valid: false,
        expired: e.message === 'jwt expired',
        decoded: false
    }
    }
}