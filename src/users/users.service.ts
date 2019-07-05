import { Injectable } from '@nestjs/common';
import { User } from "../interfaces/userCollection.interface";

@Injectable()
export class UsersService {
    constructor() {}
    findUser(user:{userID?: string, username?: string}) {
        
        if(user.userID) {
            return (user.userID == '12345678') ? fakeUser : null;
        } else {
            return (user.username == 'Peter.Parker') ? fakeUser : null;
        }
    }
}

export const fakeUser: User = {
    userID: '12345678',
    username: 'Peter.Parker',
    firstName: 'Peter',
    lastName: 'Parker',
    displayName: 'Spiderman',
    lastLogin: new Date(),
    site_clinic_id: 'langley-mental-health',
    roles: ['user', 'admin']
}