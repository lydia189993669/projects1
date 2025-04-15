import { 
    GenerateOneTimePasswordRequest
} from '../../../../platform/request/common/request';
import { RedisAdapter } from '../../../../platform/storage/common/redis';
import { MagicLinkEmail } from '../../../../server/email/templates/magic-link-email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {

    const payload: GenerateOneTimePasswordRequest = await request.json();

    const confirmationCode = Math.floor(100000 + Math.random() * 900000)
        .toString()
        .slice(0, 6);
    console.log(`confirmationCode to user<email=${payload.email}>`, confirmationCode);

    // Save the confirmation code in Redis
    await RedisAdapter.defaultClient.set(
        generateOTPKey(payload.email),
        confirmationCode,
        'EX',
        10 * 60
    );

    // send email to users email address with a short-lived token
    await new MagicLinkEmail({
        to: payload.email,
        token: confirmationCode,
    }).send();

    return NextResponse.json({
        ok: true,
        status: 200,
    });
}

function generateOTPKey(user: string) {
    return `otp:${user}`;
}
