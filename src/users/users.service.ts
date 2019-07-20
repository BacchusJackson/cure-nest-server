import { Injectable } from '@nestjs/common';
import { User, NewUser, Response, UpdatedUser, UserDTO } from "./userCollection.interface";
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository:Repository<UsersEntity>
    ) {}

  async createUser(newUser: NewUser): Promise<Response> {

    try {
      // TODO: Add password to credentials table
      const userDTO: UserDTO = {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        displayName: `${newUser.firstName} ${newUser.lastName}`,
        active: true,
        dbOriginDate: new Date(),
        dbLastLogOn: new Date(),
      };

      const newDBUser = await this.usersRepository.create(userDTO);

      await this.usersRepository.save(newDBUser);

      return { success: true, user: fakeUser };

    } catch (err) {
      if(err.number === 2627) {
        return {success: false, message: 'Username is already Taken'}
      }
      return { success: false, message: err };

    }
  }

  async readUserByUsername(username: string): Promise<Response> {

    try {
      const foundUser = await this.usersRepository.findOne({where: {username}});

      if (!foundUser || foundUser.active === false) {
        return {success: false, message: 'User Not Found'}
      }
      const castedUser:User = {
        userID: foundUser.id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        displayName: foundUser.displayName,
        lastLogin: foundUser.dbLastLogOn,
        siteClinicId: foundUser.siteClinicID,
        roles: ['user']
      }

      return { success: true, user: castedUser }
    } catch (err) {
      return { success: false, message: err }
    }
  }

  async readUserByID(userID: string): Promise<Response> {

    try {
      const foundUser = await this.usersRepository.findOne({where: {id: userID}});

      if (!foundUser || foundUser.active === false) {
        return {success: false, message: 'User Not Found'}
      }
      const castedUser:User = {
        userID: foundUser.id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        displayName: foundUser.displayName,
        lastLogin: foundUser.dbLastLogOn,
        siteClinicId: foundUser.siteClinicID,
        roles: ['user']
      }
      
      return { success: true, user: castedUser }
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