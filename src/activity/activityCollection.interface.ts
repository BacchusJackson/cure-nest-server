export interface Activity {
    activityID: string;
    name: string;
    categoryID: string;
    parameters?: any;
}

export interface NewActivity {
    name: string;
    categoryID: string;
}

export interface Response {
    success: boolean;
    message?: string;
    activity?: Activity;
    activities?: Activity[];
}