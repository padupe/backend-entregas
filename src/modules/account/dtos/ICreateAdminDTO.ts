interface ICreateAdminDTO {
    id?: string;
    profile_type: number;
    email: string;
    username: string;
    password: string;
}

export { ICreateAdminDTO }