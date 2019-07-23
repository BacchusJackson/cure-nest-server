import { IsString } from "class-validator";
import { UserEntity } from "../users/user.entity";
import { ClinicRO } from "../clinic/clinic.dto";

export class UserDTO {
  
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  displayName?: string;

}

export class UserRO {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  created: Date;
  lastLogOn: Date;
  roles?: string;
  token?: string;
  users?: UserEntity;
  clinic?: ClinicRO;
}