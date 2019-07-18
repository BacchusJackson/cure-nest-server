import { Injectable } from '@nestjs/common';
import { Credentials, User, SignInResponse } from "../users/userCollection.interface";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { stringLiteral } from '@babel/types';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) { }

  authenticateUserCredentials(credentials: Credentials): SignInResponse {

    // Check database for user
    const foundUser = this.usersService.readUserByUsername(credentials.username).user;

    if (!foundUser) {
      return { success: false, message: 'Invalid Credentials' };
    }

    // Compare password hashes
    if (!this.confirmPassword) {
      return { success: false, message: 'Invalid Credentials' };
    }
    // Sign the userID, creating a token
    const token = this.jwtService.sign({ userID: foundUser.userID });

    return { success: true, token: token, expiresIn: 3600 };
  }

  private confirmPassword(user: User, passwordAttempt: string) {
    // TODO: Select SQL Command
    const hashedPassword = 'MASKED';

    if (passwordAttempt === hashedPassword) {
      return { success: true, user: user };
    } else {
      return { success: false, message: 'Invalid Credentials' };
    }
  }
}