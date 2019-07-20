export interface Credentials {
  username: string;
  password: string;
}

export interface UserObject {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  lastLogin: Date;
  siteClinicId: string;
  roles: string[];
}

export interface UpdateUserOptions {
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
  autoCreatedDate: Date;
  autoLastLogOn: Date;
}

export interface Response {
  success: boolean;
  message?: string;
  user?: UserObject;

}
export interface SignInResponse extends Response {
  token?: string;
  expiresIn?: number;
}