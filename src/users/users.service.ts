import { Injectable } from '@nestjs/common';
import { User, NewUser, Response, UpdatedUser } from "./userCollection.interface";

@Injectable()
export class UsersService {

  createUser(newUser: NewUser): Response {

    // Check for existing user
    if (this.readUserByUsername(newUser.username)) {
      return { success: false, message: 'This username is taken' };
    }

    try {
      // TODO: Insert SQL Command
      return { success: true, user: fakeUser };
    } catch (err) {
      return { success: false, message: err }
    }
  }

  readUserByUsername(username: string): Response {

    try {
      // TODO: Select SQL Command
      

      return { success: true, user: fakeUser }
    } catch (err) {
      return { success: false, message: err }
    }
  }

  readUserByID(userID: string): Response {

    try {
      // TODO: Select SQL Command
      return { success: true, user: fakeUser }
    } catch (err) {
      return { success: false, message: err }
    }
  }

  updateUser(userID: string, updatedUser: UpdatedUser): Response {

    try {
      // TODO: Update SQL Command
      return { success: true, user: fakeUser }
    } catch (err) {
      return { success: false, message: err }
    }
  }

  deleteUser(userID: string): Response {

    try {
      // TODO: Update SQL Command activeBit = 0
      return { success: true }
    } catch (err) {
      return { success: false, message: err }
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
  siteClinicId: 'langley-mental-health',
  roles: ['user', 'admin']
}