export interface Credentials {
    username: string;
    password: string;
}
export interface User {
    userID: string;
    username: string;
    firstName: string;
    lastName: string;
    displayName: string;
    lastLogin: Date;
    site_clinic_id: string;
    roles: string[];
}

export interface UpdatedUser {
    username?: string;
    firstname?: string;
    lastname?:string;
    displayName?:string;
    site_clinic_id?: string;
}

export interface NewUser {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface SignInResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: User;
    expiresIn?: number;
}

export interface Response {
    success: boolean;
    message?: string;
    user?: User;
    
}