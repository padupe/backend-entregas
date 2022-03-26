import { prisma } from "@database/prismaClient";
import { AppError } from "@shared/errors/appError";

interface ICreateProfile {
    type: number;
    name: string;
}

interface IResponseProfileCreated {
    message: string;
    profile: Object;
}

export class CreateProfileUseCase {

    async execute({ type, name }: ICreateProfile): Promise<IResponseProfileCreated> {

        const typeExists = await prisma.profiles.findUnique({
            where: {
                type
            }
        })

        const nameExists = await prisma.profiles.findUnique({
            where: {
                name
            }
        })

        if(typeExists || nameExists ) {
            throw new AppError('Profile already exists!')
        }

        const newProfile = await prisma.profiles.create({
            data: {
                type,
                name
            }
        })

        return {
            message: "Profile registered successfully",
            profile: {
                id: newProfile.id,
                name: newProfile.name,
                type: newProfile.type
            }
        }

    }
}