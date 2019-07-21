import { IsDate, IsJSON } from "class-validator";
import { UserRO } from "../users/user.dto";

export class EntryDTO {
    @IsDate()
    entryDate: Date;

    @IsJSON()
    details: string;
}

export class EntryRO {
    id: string;
    entryDate: Date;
    details: string;
    author: UserRO;
}