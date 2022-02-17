import { prisma } from "./prismaClient";
import { hash } from "bcrypt";

export const adminApp = {
  email: "admin@test.com",
  username: "admin_app",
  password: process.env.PASSWORD_ADMIN
}

export const clientDefault = {
  email: "default@email.com",
  username: "padupe",
  password: process.env.PASSWORD_DEFAULT_CLIENT
}

export const DeliverymanDefault = {
  email: "default@email.com",
  username: "padupeEntregador",
  password: process.env.PASSWORD_DELIVERYMAN_DEFAULT
}

export async function clearDataBase() {
  await prisma.deliveries.deleteMany({ where: {} });
  await prisma.deliverymans.deleteMany({ where: {} });
  await prisma.clients.deleteMany({ where: {} });
  await prisma.admin.deleteMany({ where: {} });
  await prisma.profiles.deleteMany({ where: {} });
}

export async function populateDataBase() {

  const admin = await prisma.admin.create({
      data: {
          email: adminApp.email,
          username: adminApp.username,
          password: await hash(String(adminApp.password), 10),
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
      { email: "clientone@email.com", username: "clientone", password: await hash(String(process.env.PASSWORD_CLIENT_1), 10)},
      { email: "clienttwo@email.com", username: "clienttwo", password: await hash(String(process.env.PASSWORD_CLIENT_2), 10)},
      { email: "clientthree@email.com", username: "clientthree", password: await hash(String(process.env.PASSWORD_CLIENT_3), 10)}
    ]
  })

  const client = await prisma.clients.create({
    data: {
      email: clientDefault.email,
      username: clientDefault.username,
      password: await hash(String(clientDefault.password), 10)
    }
  })

  const deliverymans = await prisma.deliverymans.createMany({
    data: [
      { email: "deliverymanone@email.com", username: "deliveryone", password: await hash(String(process.env.PASSWORD_DELIVERYMAN_1), 10)},
      { email: "deliverymantwo@email.com", username: "deliverytwo", password: await hash(String(process.env.PASSWORD_DELIVERYMAN_2), 10)},
      { email: "deliverymanthree@email.com", username: "deliverythree", password: await hash(String(process.env.PASSWORD_DELIVERYMAN_3), 10)}
    ]
  })

  const deliveryman = prisma.deliverymans.create({
    data: {
      email: DeliverymanDefault.email,
      username: DeliverymanDefault.username,
      password: await hash(String(DeliverymanDefault.password), 10)
    }
  })

  const deliverieDefault = await prisma.deliveries.create({
    data: {
      item_name: "Item Test",
      id_client: client.id
    }
  })


  const updateDeliverieDefault = await prisma.deliveries.update({
    where: {
      id: deliverieDefault.id
    },
    data: {
      id_deliveryman: (await deliveryman).id
    }
  })
}

async function main() {
  await populateDataBase();
}

if (process.env.NODE_ENV !== "test") {
  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}