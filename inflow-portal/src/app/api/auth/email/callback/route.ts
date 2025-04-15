import { addMonths } from 'date-fns';
import { GenerateOneTimePasswordRequest, LoginWithOneTimePasswordResponse } from '../../../../../platform/request/common/request';
import { RedisAdapter } from '../../../../../platform/storage/common/redis';
import { accountProvisioner } from '../../../../../server/commands/accountProvisioner';
import { generateJwtToken } from '../../../../../server/common/jwt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const providerName = 'email';

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email')!;
    const code = searchParams.get('code');

    const confirmationCode = await RedisAdapter.defaultClient.get(generateOTPKey(email));

    if (confirmationCode !== code) {
        console.log(`Invalid code for user<email=${email}, otp=${confirmationCode}>`, code);
        return new Response('Invalid code', {
            status: 401,
        });
    }

    const { user, info } = await verifyUser({ email });
    const expires = addMonths(new Date(), 3);
    const token = generateJwtToken(user, expires);

    const cookieStore = await cookies();
    cookieStore.set('credential', token, { expires });

    const data: LoginWithOneTimePasswordResponse = {
        token,
        user,
        provider: {
            id: providerName,
            name: providerName,
            authUrl: ''
        }
    }
    
    return NextResponse.json({
        data,
        ok: true,
        status: 200,
    });
}

function generateOTPKey(user: string) {
    return `otp:${user}`;
}

async function verifyUser(user: GenerateOneTimePasswordRequest) {
    const name = user.email.split('@')[0];
    const result = await accountProvisioner({
        ip: '',
        space: {
            name,
            icon: '',
        },
        user: {
            name,
            email: user.email,
        },
        authenticationProvider: {
            name: providerName,
            providerId: user.email,
        },
    });
    return { user: result.user, info: result };
}