import { IUser } from '../../../base/storage/common/schema';

//#region Auth

export type AuthProvider = {
    id: string;
    name: string;
    authUrl: string;
};

export type AuthConfig = {
    name?: string;
    logo?: string;
    providers: AuthProvider[];
};

export type GenerateOneTimePasswordRequest = {
    email: string;
}

export type LoginWithOneTimePasswordRequest = {
    email?: string;
    password: string;
};

export type LoginWithOneTimePasswordResponse = {
    token: string;
    user: IUser;
    provider: AuthProvider;
};

//#endregion