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
  siteClinicId: string;
  roles: string[];
}

export interface UpdatedUser {
  username?: string;
  firstname?: string;
  lastname?: string;
  displayName?: string;
  siteClinicId?: string;
}

export interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserDTO extends NewUser {
  displayName: string;
  active: boolean;
  dbOriginDate: Date;
  dbLastLogOn: Date;
}

export interface Response {
  success: boolean;
  message?: string;
  user?: User;

}
export interface SignInResponse extends Response {
  token?: string;
  expiresIn?: number;
}