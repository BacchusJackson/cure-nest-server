import { Injectable } from '@nestjs/common';
import { Credentials, User, SignInResponse } from "../interfaces/userCollection.interface";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthenticationService {
    constructor(private readonly jwtService: JwtService, private readonly usersService:UsersService) {}

    postAuthenticate(credentials: Credentials) {
        
        const response: SignInResponse = {success:false, message: null, user: null, token:null};
        
        // Check database for user
        response.user = this.usersService.findUser({username: credentials.username});
        
        // If No user was found
        if(!response.user) {
            response.message = "Invalid Credentials";
            return response;
        }
        
        // Compare passwords
        const goodPassword = (credentials.password == 'password');

        if(!goodPassword) {
            response.message = "Invalid Credentials";
            response.user = null;
            return response;
        }
        
        // Sign the userID, creating a token
        response.token = this.jwtService.sign({userID: response.user.userID});

        response.success = true;
        response.expiresIn = 3600;

        // Return the token 
        return response;
    }
}