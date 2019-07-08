import { Injectable } from '@nestjs/common';
import { User, NewUser, AddUserResponse, DeleteUserResponse, UpdateUser, UpdateUserResponse } from "../interfaces/userCollection.interface";

@Injectable()
export class UsersService {
  constructor() { }
  findUser(user: { userID?: string, username?: string }) {

    if (user.userID) {
      return (user.userID == '12345678') ? fakeUser : null;
    } else {
      return (user.username == 'Peter.Parker') ? fakeUser : null;
    }
  }

  addUser(newUser: NewUser) {

    const foundUser = this.findUser({ username: newUser.username });
    const response: AddUserResponse = { success: false, user: null, message: null };

    if (foundUser) {

      response.message = "Username is Taken";
      return response;
    }

    try {

      const fakeNewUser: User = {
        userID: '12345679',
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        displayName: `${newUser.firstName} ${newUser.lastName}`,
        lastLogin: new Date(),
        site_clinic_id: null,
        roles: ['user']
      }

      // TODO: Add password
      response.success = true;
      response.user = fakeNewUser;

      return response;
    } catch (error) {
      response.success = false;
      response.message = error;
      return response;
    }
  }

  deleteUser(username:string) {
    const response: DeleteUserResponse = { success: false, userInfo: null, message: null };
    
    const foundUser = this.findUser({username:username})

    // TODO: add database UPDATE request to switch active to 0
    response.success = true;
    response.userInfo = { username: foundUser.username, userId: foundUser.userID };
    return response;
  }

  updateUser(username:string, updateUserInfo: UpdateUser) {
    const response: UpdateUserResponse = {success: false, message : null, user : null}

    const foundUser = this.findUser({username:username});

    if(!foundUser) { 
      response.message = "That User does not exist";
      return response;
    }

    // TODO: Database UPDATE request

  try{

    updateUserInfo.username ? foundUser.username = updateUserInfo.username : null;
    updateUserInfo.displayName ? foundUser.displayName = updateUserInfo.displayName : null;
    updateUserInfo.firstname ? foundUser.firstName = updateUserInfo.firstname : null;
    updateUserInfo.lastname ? foundUser.lastName = updateUserInfo.lastname : null;
    updateUserInfo.site_clinic_id ? foundUser.site_clinic_id = updateUserInfo.site_clinic_id : null;
    
    response.success = true;
    response.user = foundUser;
    
    return response;
  } catch (error) {
    response.success = false;
    response.message = error;
    return response;
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