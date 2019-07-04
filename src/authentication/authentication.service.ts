import { Injectable } from '@nestjs/common';
import { Credentials, User } from "../interfaces/userCollection.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
    constructor(private readonly jwtService: JwtService) {}
    
    postAuthenticate(credentials: Credentials) {
        // Check database for user
        const foundUser = (credentials.username == 'Peter.Parker') ? fakeUser : null;
        
        // If there's no user with that username
        if(!foundUser) return null;

        // Compare passwords
        const goodPassword = (credentials.password == 'password');

        if(!goodPassword) return null;

        
    }

}

// Fake return from database
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