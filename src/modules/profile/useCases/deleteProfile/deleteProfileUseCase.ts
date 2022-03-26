import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";

interface IDeleteProfileByID {
    id: string;
}

interface IResponseDeleteProfile {
    message: string;
    profile_deleted: Object
}

export class DeleteProfileUseCase {

    async execute( { id }: IDeleteProfileByID ): Promise<IResponseDeleteProfile> {

        const profileExists = await prisma.profiles.findUnique({
            where: {
                id
            }
        })

        if(!profileExists) {
            throw new AppError("Profile not found!")
        }

        const deleteProfile = await prisma.profiles.delete({
            where: {
                id: profileExists?.id
            },
            select: {
                name: true,
                type: true
            }
        })

        return {
            message: "Profile deleted successfully",
            profile_deleted: {
                name: deleteProfile?.name,
                type: deleteProfile?.type
            }
        }
    }
}