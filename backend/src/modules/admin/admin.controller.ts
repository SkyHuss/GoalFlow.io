import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/entities/user.entities';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags('Admin panel')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all app users' })
  findAll(): Promise<User[]> {
    return this.adminService.findAll();
  }
}
