import * as JWT from 'jsonwebtoken';
import { AuthenticationError } from './error';
import { IUser } from '../../base/storage/common/schema';
import { prisma } from '../../base/storage/common/prisma';
import { environment } from '../../platform/environment/common/environment';

export function verifyJWT(token: string){
    let payload: JWT.JwtPayload;
    if (!token) {
        throw AuthenticationError('Missing token');
    }

    try {
        // todo: decode at first and verify with secret that comes from user later.
        payload = JWT.verify(token, environment.SECRET_KEY) as JWT.JwtPayload;
    } catch (err) {
        throw AuthenticationError('Unable to decode token');
    }

    if (!payload) {
        throw AuthenticationError('Invalid token');
    }

    // check the token is within it's expiration time
    if (payload.expiresAt) {
        if (new Date(payload.expiresAt) < new Date()) {
            throw AuthenticationError('Expired token');
        }
    }
    return payload;
}

export async function getUserForJWT(
    token: string,
    allowedTypes = ['session', 'transfer']
): Promise<IUser> {
    const payload = verifyJWT(token);

    if (!allowedTypes.includes(payload.type)) {
        throw AuthenticationError('Invalid token');
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.id },
        include: {
            spaces: true,
        }
    });
    if (!user) {
        throw AuthenticationError('Invalid token');
    }

    if (payload.type === 'transfer') {
        // If the user has made a single API request since the transfer token was
        // created then it's no longer valid, they'll need to sign in again.
        if (
            user.lastActiveAt &&
            payload.createdAt &&
            user.lastActiveAt > new Date(payload.createdAt)
        ) {
            throw AuthenticationError('Token has already been used');
        }
    }

    return user;
}

export function generateJwtToken(user: IUser, expiresAt: Date) {
    return JWT.sign(
        {
            id: user.id,
            expiresAt: expiresAt ? expiresAt.toISOString() : undefined,
            type: 'session',
        },
        environment.SECRET_KEY
    );
}