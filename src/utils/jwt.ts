import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (payload: JwtPayload, scret: string, expiresIn: SignOptions) => {

    const token = jwt.sign(payload, scret, { expiresIn } as SignOptions)
    return token;
};
const verifyToken = (token: string, screte: string) => {
    try {
        const verifiedToken = jwt.verify(token, screte)
        return {
            success: true,
            data: verifiedToken
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }

}

export const jwtUtils = {
    createToken, verifyToken
}
