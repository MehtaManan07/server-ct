import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/common/logger';
import { Role } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
// @ApiBearerAuth('access-token')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(UsersController.name);
  }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('role/:role')
  findByRole(@Param('role') role: Role) {
    return this.usersService.findByRole(role);
  }

  @Get('me')
  findMe(@Req() req: any) {
    return this.usersService.findMe(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
