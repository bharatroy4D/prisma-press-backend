import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string;
                id: string;
                email: string;
                role: Role;

            }
        }
    }
}

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies?.accessToken
            ? req.cookies.accessToken
            : req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : req.headers.authorization;

        if (!token) {
            throw new Error("You are not logged in.please login to in access this Resources")
        }

        const verifedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

        if (!verifedToken.success) {
            throw new Error(verifedToken.error)
        };
        const { email, name, id, role } = verifedToken.data as JwtPayload;

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden, you don't have permision to access this resources")
        }
        const user = await prisma.user.findUnique({
            where: {
                id,
                email,
                name,
                role
            }
        })
        if (!user) {
            throw new Error("User not found.Please login in again")
        }
        if (user.activeStatus === "BLOCKED") {
            throw new Error("Your account has been blocked. Please contact support.");
        }
        req.user = {
            email,
            id,
            name,
            role
        }
        next();
    })
}