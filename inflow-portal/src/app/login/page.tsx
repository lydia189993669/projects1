import { Login } from '../../components/authentication/login';

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { email = '' } = await searchParams;
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Login emailLinkSentTo={email} />
            </div>
        </div>
    )
}
