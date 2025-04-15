import { IUser } from '../../base/storage/common/schema';
import { prisma } from '../../base/storage/common/prisma';
import { spaceCreator } from './spaceCreator';

export type SpaceProvisionerOptions = {
    /**
     * The internal ID of the space that is being logged into based on the
     * subdomain that the request came from, if any.
     */
    spaceId?: string;
    /** The displayed name of the space */
    name: string;
    /** The public icon representing the space */
    icon?: string | null;
    user: IUser;
};

export async function spaceProvisioner({
    spaceId,
    name,
    icon,
    user,
}: SpaceProvisionerOptions) {
    // Check if the space already exists by userId
    const existingSpace = await prisma.space.findFirst({
        where: {
            userId: user.id,
        },
    });

    if (existingSpace) {
        return {
            space: existingSpace,
            isNewSpace: false,
        };
    }

    // We cannot find an existing space, so we create a new one
    const space = await spaceCreator({
        name,
        icon,
        userId: user.id,
    });

    return {
        space,
        isNewSpace: true,
    };
}