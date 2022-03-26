import { Deliveries } from "@prisma/client";

interface ICreateCustomerDTO {
    id?: string;
    profile_type: number;
    email: string;
    username: string;
    password: string;
    deliveries?: Deliveries[];
}

export { ICreateCustomerDTO }