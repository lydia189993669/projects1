import { redirect } from 'next/navigation';
import { LoginForm } from './login-form';
import { OTPForm } from './otp-form';

type LoginProps = {
    emailLinkSentTo: string;
}

export function Login({
    emailLinkSentTo
}: LoginProps) {

    if (emailLinkSentTo) {
        return <OTPForm emailLinkSentTo={emailLinkSentTo}/>
    }

    return (
        <LoginForm />
    )
}