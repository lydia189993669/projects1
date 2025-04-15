import { prisma } from '../../base/storage/common/prisma';

type SpaceCreatorOptions = {
    /** The displayed name of the space */
    name: string;
   
    /** The icon of space */
    icon?: string | null;

    userId: string;
};

export async function spaceCreator({
    name,
    icon,
    userId,
}: SpaceCreatorOptions) {
    const space = await prisma.space.create({
        data: {
            name,
            icon,
            userId,
        },
    });

    return space;
}