export interface Entry {
    entryID: string;
    dateCreated: Date; // When the entry was submitted
    active: boolean;
    date: Date; // The date they entered
    category: string;
    activity: string;
    details: any;
    username: string;
    site: string;
    clinic: string;
}

export interface NewEntry {
    dateCreated?: Date;
    active?: boolean;
    date: Date;
    details: any;
    activityID: string;
    userID: string;
    siteID: string;
    clinicID: string;

}

export interface Response {
    success: boolean;
    message?: string;
    entries?: Entry[];
}
