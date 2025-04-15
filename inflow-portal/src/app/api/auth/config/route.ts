import { NextResponse } from 'next/server';
import { AuthProvider } from '../../../../platform/request/common/request';

const emailAuthProvider: AuthProvider = {
    id: 'email',
    name: 'Email',
    authUrl: '/api/auth/email',
};

export async function GET(request: Request) {
    return NextResponse.json({
        data: {
            providers: [emailAuthProvider],
        },
        ok: true,
        status: 200,
    });
}
