import { prisma } from "./prismaClient";
import { hashPassword } from "../helpers/bcrypt";

export const adminApp = {
  email: "admin@test.com",
  username: "admin_app",
  password: process.env.PASSWORD_ADMIN
}

export const customerDefault = {
  email: "default@email.com",
  username: "padupe",
  password: process.env.PASSWORD_DEFAULT_CLIENT
}

export const DeliverymanDefault = {
  email: "default@email.com",
  username: "padupeEntregador",
  password: process.env.PASSWORD_DELIVERYMAN_DEFAULT
}

export const DeliverymanFailure = {
  email: "failure@email.com",
  username: "failureEntregador",
  password: process.env.PASSWORD_DELIVERYMAN_FAILURE
}

export const ProfileDefault = {
  type: 99,
  name: "deletedTest"
}

export async function clearDataBase() {
  await prisma.deliveries.deleteMany({ where: {} });
  await prisma.deliverymans.deleteMany({ where: {} });
  await prisma.customers.deleteMany({ where: {} });
  await prisma.admin.deleteMany({ where: {} });
  await prisma.profiles.deleteMany({ where: {} });
}

export async function populateDataBase() {

  const admin = await prisma.admin.create({
      data: {
          email: adminApp.email,
          username: adminApp.username,
          password: await hashPassword(String(adminApp.password)),
      }
  })

  const profiles = await prisma.profiles.createMany({
      data: [
          { type: 1, name: "Admin"},
          { type: 2, name: "Customer"},
          { type: 3, name: "Deliveryman"}
      ]
  })

  const failureProfile = await prisma.profiles.create({
    data: {
      type: ProfileDefault.type,
      name: ProfileDefault.name
    }
  })

  const customers = await prisma.customers.createMany({
    data: [
      { email: "customerone@email.com", username: "customerone", password: await hashPassword(String(process.env.PASSWORD_CUSTOMER_1))},
      { email: "customertwo@email.com", username: "customertwo", password: await hashPassword(String(process.env.PASSWORD_CUSTOMER_2))},
      { email: "customerthree@email.com", username: "customerthree", password: await hashPassword(String(process.env.PASSWORD_CUSTOMER_3))}
    ]
  })

  const customer = await prisma.customers.create({
    data: {
      email: customerDefault.email,
      username: customerDefault.username,
      password: await hashPassword(String(customerDefault.password))
    }
  })

  const deliverymans = await prisma.deliverymans.createMany({
    data: [
      { email: "deliverymanone@email.com", username: "deliveryone", password: await hashPassword(String(process.env.PASSWORD_DELIVERYMAN_1))},
      { email: "deliverymantwo@email.com", username: "deliverytwo", password: await hashPassword(String(process.env.PASSWORD_DELIVERYMAN_2))},
      { email: "deliverymanthree@email.com", username: "deliverythree", password: await hashPassword(String(process.env.PASSWORD_DELIVERYMAN_3))}
    ]
  })

  const deliveryman = await prisma.deliverymans.create({
    data: {
      email: DeliverymanDefault.email,
      username: DeliverymanDefault.username,
      password: await hashPassword(String(DeliverymanDefault.password))
    }
  })

  const deliverymanFail = await prisma.deliverymans.create({
    data: {
      email: DeliverymanFailure.email,
      username: DeliverymanFailure.username,
      password: await hashPassword(String(DeliverymanFailure.password))
    }
  })

  const deliverieDefault = await prisma.deliveries.create({
    data: {
      item_name: "Item Test One",
      id_customer: customer.id
    }
  })

  const deliverieAvailable = await prisma.deliveries.create({
    data: {
      item_name: "Item Test Two",
      id_customer: customer.id
    }
  })

  const deliverieEndDate = await prisma.deliveries.create({
    data: {
      item_name: "Item Test Three",
      id_customer: customer.id,
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
  await clearDataBase();
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