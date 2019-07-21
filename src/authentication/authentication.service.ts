import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService ) { }

  authenticateUserCredentials(credentials) {

    // Check database for user
    const foundUser = null 

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

  private confirmPassword(user, passwordAttempt: string) {
    // TODO: Select SQL Command
    const hashedPassword = 'MASKED';

    if (passwordAttempt === hashedPassword) {
      return { success: true, user: user };
    } else {
      return { success: false, message: 'Invalid Credentials' };
    }
  }
}