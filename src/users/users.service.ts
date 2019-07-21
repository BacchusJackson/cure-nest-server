import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from "./user.dto";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) { }

  async logOn(credentials: { username: string, password: string }) {
    const { username, password } = credentials;

    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid Username/Password', HttpStatus.BAD_REQUEST);
    };

    this.usersRepository.update({ id: user.id }, { autoLastLogOn: new Date() });
    
    return user.toResponseObject(true);
    
  }

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

  async readAllUsers() {
    const users = await this.usersRepository.find({ where: { active: true } });

    return users.map(user => user.toResponseObject(false));
  }

  async readUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username, active: true } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    return user.toResponseObject(false);
  }

  async readUserByID(userID: string) {
    const user = await this.usersRepository.findOne({ where: { id: userID, active: true } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }
    return user.toResponseObject(false);
  }

  async updateUser(userID: string, data: Partial<UserDTO>) {
    let user = await this.usersRepository.findOne({ where: { id: userID } })

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }

    await this.usersRepository.update({ id: userID }, data);

    user = await this.usersRepository.findOne({ where: { id: userID } });

    return user.toResponseObject(false);
  }

  async deleteUser(userID: string) {
    const user = await this.usersRepository.findOne({ where: { id: userID } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update({ id: userID }, { active: false });

    return { sucess: true };

  }
}