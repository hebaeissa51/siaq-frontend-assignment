export type RoleTypes = "Manager" | "HR" | "Accountant" | "Sales";

export type UserTypes = {
    id: number;
    name: string;
    email: string;
    password?: string;
    role: RoleTypes;
    photo: string;
    phone: string;
}

export type LoginTypes = {
    email: string;
    password: string;
}