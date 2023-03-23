import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {};

    async register(
        registrationData: RegisterDTO
    ) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        const userData = {
            email: registrationData.email,
        };
        return this.userService.createNewUser(userData, hashedPassword)
    }
}
