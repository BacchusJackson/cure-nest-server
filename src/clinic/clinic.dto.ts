import { IsString } from "class-validator";

export class ClinicDTO {
    @IsString()
    name: string;

    @IsString()
    site: string;

}

export class ClinicRO {
    id: string;
    name: string;
    site: string;
}