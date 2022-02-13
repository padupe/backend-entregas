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

  const clients = await prisma.clients.createMany({
    data: [
      //@ts-ignore
      { email: "userone@email.com", username: "clientone", password: await hash(process.env.PASSWORD_USER_1, 10)},
      //@ts-ignore
      { email: "usertwo@email.com", username: "clienttwo", password: await hash(process.env.PASSWORD_USER_2, 10)},
      //@ts-ignore
      { email: "userthree@email.com", username: "clientthree", password: await hash(process.env.PASSWORD_USER_3, 10)}
    ]
  })

  const clientDefault = await prisma.clients.create({
    data: {
      email: "default@email.com",
      username: "client_default",
      password: await hash("passwordTest", 10)
    }
  })

  const deliverymans = await prisma.deliverymans.createMany({
    data: [
      //@ts-ignore
      { email: "deliverymanone@email.com", username: "deliveryone", password: await hash(process.env.PASSWORD_DELIVERYMAN_1, 10)},
      //@ts-ignore
      { email: "deliverymantwo@email.com", username: "deliverytwo", password: await hash(process.env.PASSWORD_DELIVERYMAN_2, 10)},
      //@ts-ignore
      { email: "deliverymanthree@email.com", username: "deliverythree", password: await hash(process.env.PASSWORD_DELIVERYMAN_3, 10)}
    ]
  })

  const deliverymanDefault = prisma.deliverymans.create({
    data: {
      email: "default@email.com",
      username: "client_default",
      password: await hash("passwordTest", 10)
    }
  })

  const deliverieDefault = await prisma.deliveries.create({
    data: {
      item_name: "Item Test",
      id_client: clientDefault.id
    }
  })


  const updateDeliverieDefault = await prisma.deliveries.update({
    where: {
      id: deliverieDefault.id
    },
    data: {
      id_deliveryman: (await deliverymanDefault).id
    }
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