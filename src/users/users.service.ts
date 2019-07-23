import { Injectable, HttpException, HttpStatus, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from "./user.dto";
import * as jwt from 'jsonwebtoken';
import { ClinicEntity } from '../clinic/clinic.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ClinicEntity)
    private clinicRepository: Repository<ClinicEntity>
  ) { }

  async logOn(credentials: { username: string, password: string }) {
    const { username, password } = credentials;

    const user = await this.usersRepository.findOne({ where: { username, active: true } });

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid Username/Password', HttpStatus.BAD_REQUEST);
    };

    this.usersRepository.update({ id: user.id }, { autoLastLogOn: new Date() });

    return user.toResponseObject(true);

  }

  // [C]RUD
  async createUser(data: UserDTO) {
    const { username } = data;
    let user = await this.usersRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('Username is already taken', HttpStatus.BAD_REQUEST);
    }

    user = await this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user.toResponseObject();

  }

  // C[R]UD
  async readAllUsers() {
    const users = await this.usersRepository.find({ where: { active: true }, relations: ['clinic'] });

    return users.map(user => this.UserToResponseObject(user));
  }

  async readAllUsersWithDeleted() {
    const users = await this.usersRepository.find({relations: ['clinic']});

    return users.map(user => this.UserToResponseObject(user));
  }

  // C[R]UD
  async readUserByUsername(username: string, token?: string) {

    if (token) {
      const tokenMatch = await this.tokenMatchesRequest(username, token);
      if (!tokenMatch) {
        throw new HttpException('Invalid Permmisions', HttpStatus.UNAUTHORIZED);
      }
    }

    const user = await this.usersRepository.findOne({ where: { username, active: true }, relations: ['clinic'] });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    return this.UserToResponseObject(user);
  }

  // C[R]UD
  async readUserByID(userID: string) {
    const user = await this.usersRepository.findOne({ where: { id: userID, active: true }, relations: ['clinic'] });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }
    return this.UserToResponseObject(user);
  }

  // CR[U]D
  async updateUser(userID: string, data: Partial<UserDTO>) {
    let user = await this.usersRepository.findOne({ where: { id: userID }, relations: ['clinic'] })

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }

    await this.usersRepository.update({ id: userID }, data);

    user = await this.usersRepository.findOne({ where: { id: userID } });

    return this.UserToResponseObject(user);
  }

  async updateMyProfile(username: string, data: Partial<UserDTO>, token: string) {

    const tokenMatch = await this.tokenMatchesRequest(username, token);
    if (!tokenMatch) {
      throw new HttpException('Invalid Permmisions', HttpStatus.UNAUTHORIZED);
    }


    let user = await this.usersRepository.findOne({ where: { username: username }, relations: ['clinic'] })

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }

    await this.usersRepository.update({ id: user.id }, data);

    user = await this.usersRepository.findOne({ where: { id: user.id } });

    return this.UserToResponseObject(user);
  }

  // CRU[D]
  async deleteUser(userID: string) {
    const user = await this.usersRepository.findOne({ where: { id: userID } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update({ id: userID }, { active: false });

    return { success: true };

  }

  async restoreUser(userID: string) {
    const user = await this.usersRepository.findOne({ where: { id: userID } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update({ id: userID }, { active: true })

    return { success: true };
  }

  async modifyRoles(userID, data) {

    const user = this.usersRepository.find({ where: { id: userID } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update({ id: userID }, { roles: data.roles });

    return { success: true }
  }

  async modifyClinic(userID, clinicID) {

    const user = await this.usersRepository.findOne({where: {id: userID}});

    if(!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const clinic = await this.clinicRepository.findOne({where: {id: clinicID}});

    if(!clinic) {
      throw new HttpException('Clinic Not Found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update({ id: userID}, {clinic});

    return { success: true };
  }

  private async tokenMatchesRequest(attemptedUsername: string, token: string) {

    if (!token) return false;

    const decodedUser: any = await jwt.verify(token, process.env.SECRET);

    const { username } = decodedUser;

    if (!(attemptedUsername === username)) return false;

    return true;

  }

  private UserToResponseObject(user:UserEntity): UserRO {
    const { id, username, firstName, lastName, displayName, autoLastLogOn, autoCreatedDate, roles } = user;

    const clinic = user.clinic ? user.clinic.toResponseObject(): null;

    const responseObject: UserRO = {
      id, username, firstName, lastName,
      displayName, lastLogOn: autoLastLogOn, 
      created: autoCreatedDate, roles, clinic
    }

    return responseObject;

  }

}