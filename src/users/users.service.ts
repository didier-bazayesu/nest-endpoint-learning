import { Injectable } from '@nestjs/common';
import { mockUsers } from './mock/users.mock.js';
import { CreateUserDto } from './dto/createUser.dto.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return mockUsers;
  }

  findOne(id: number) {
    const user = mockUsers.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found!');
  }
  create(Createuser: CreateUserDto) {
    const existsId = mockUsers.some((user) => user.id === Createuser.int);
    const existEmail = mockUsers.some(
      (user) => user.email === Createuser.email,
    );
    if (existsId) return { message: 'User with this ID already exists' };
    if (existEmail) return { message: 'The email already exists' };

    const newUser = {
      id: Createuser.int ?? mockUsers.length + 1,
      ...Createuser,
    };
    mockUsers.push(newUser);
    return {
      message: 'User Created successfuly',
      date: newUser,
    };
  }

  update(id: number, updateUser: UpdateUserDto) {
    const userIndex = mockUsers.findIndex((user) => user.id === id);
    if (userIndex === -1) return { message: 'User not found!' };
    const updatedUser = { ...mockUsers[userIndex], ...updateUser, id: id };
    mockUsers[userIndex] = updatedUser;
    return {
      message: 'user updated successfull',
      data: updatedUser,
    };
  }
  delete(id: number) {
    const indexOfDelete = mockUsers.findIndex((user) => user.id === id);
    if (indexOfDelete === -1) return { message: 'user not found !' };
    const deletedUser = mockUsers.splice(indexOfDelete, 1);
    return { message: 'the user deleted Successfull ', data: deletedUser };
  }
}
