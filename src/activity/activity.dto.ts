import { IsString } from "class-validator";

export class ActivityDTO {
  @IsString()
  name: string;

  @IsString()
  category: string;

  properties: string;
}

export class ActivityRO {
  id: string;
  name: string;
  category: string;
  properties: string;
}