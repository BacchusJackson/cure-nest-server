export interface Entry {
    entryID: string;
    dateCreated: Date;
    active: boolean;
    date: Date;
    category: string;
    activity: string;
    details?: any;
    username: string;
    site: string;
    clinic: string;
}

export interface EntryResponse {
    success: boolean;
    message?: string;
    entry?: Entry;
}

export interface EntriesResponse {
    success: boolean;
    message?: string;
    entries?: Entry[];
}