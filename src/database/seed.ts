import { prisma } from "./prismaClient";
import { hash } from "bcrypt";

async function main() {

    const admin = await prisma.admin.create({
        data: {
            email: "admin@test.com",
            username: "admin_app",
            //@ts-ignore
            password: await hash(process.env.PASSWORD_ADMIN, 10),
        }
    })

    const profiles = await prisma.profiles.createMany({
        data: [
            { type: 1, name: "Admin"},
            { type: 2, name: "Client"},
            { type: 3, name: "Deliveryman"}
        ]
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })