export interface ITenant {
    _id: string;
    email: string;
    image: string;
    role: "tenant";
    name?: string | null;
    phone?: string | null;
    address?: string | null;
}