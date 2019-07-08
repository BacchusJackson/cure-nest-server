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

export interface UpdateUser {
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
    message: string;
    token?: string;
    user?: User;
    expiresIn?: number;
}

export interface GetUserResponse {
    success: boolean;
    message?: string;
    user?: User;
}

export interface AddUserResponse {
    success: boolean;
    message?: string;
    user?: User;
}

export interface DeleteUserResponse {
    success: boolean;
    message?: string;
    userInfo: {username:string, userId:string};
}

export interface UpdateUserResponse {
    success: boolean;
    message?: string;
    user?: User;
}