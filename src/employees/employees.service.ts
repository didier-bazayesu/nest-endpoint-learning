import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '../../generated/prisma/client.js';
import type { EmployeeModel } from 'generated/prisma/models.js';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseservices: DatabaseService) {}
  async create(
    createEmployeeDto: Prisma.EmployeeCreateInput,
  ): Promise<EmployeeModel> {
    return this.databaseservices.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role): Promise<EmployeeModel[]> {
    return this.databaseservices.employee.findMany({
      where: {
        role,
      },
    });
  }

  async findOne(id: number): Promise<EmployeeModel | null> {
    return this.databaseservices.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ): Promise<EmployeeModel> {
    return this.databaseservices.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number): Promise<EmployeeModel> {
    const user = this.databaseservices.employee.delete({
      where: {
        id,
      },
    });
    if(!user) {
      throw new Error(`Employee with id ${id} not found`);
    }
    return user;
  }
}
