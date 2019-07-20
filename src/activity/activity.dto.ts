import { IsString } from "class-validator";
import { ActivityEntity } from "../activity/activity.entity";

export class ActivityDTO {
    @IsString()
    name: string;
    @IsString()
    category: string;
}

export class ActivityRO {
    id: string;
    name: string;
    category: string;
}