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