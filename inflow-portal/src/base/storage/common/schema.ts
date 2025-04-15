import { Prisma } from '@prisma/client';

//#region User

const user = Prisma.validator<Prisma.UserDefaultArgs>()({});

export type IUser = Prisma.UserGetPayload<typeof user>;

const authenticationProvider =
    Prisma.validator<Prisma.AuthenticationProviderWhereUniqueInput>()({});

export type IAuthenticationProvider = Prisma.AuthenticationProviderGetPayload<
    typeof authenticationProvider
>;

//#endregion

//#region Space

const space = Prisma.validator<Prisma.SpaceDefaultArgs>()({});

export type ISpace = Prisma.SpaceGetPayload<typeof space>;


//#endregion

//#region Thread

const thread = Prisma.validator<Prisma.ThreadDefaultArgs>()({});

export type IThread = Prisma.ThreadGetPayload<typeof thread>;


//#region Thread