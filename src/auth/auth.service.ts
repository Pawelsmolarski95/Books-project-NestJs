import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const userData = {
      email: registrationData.email,
    };
    return this.userService.createNewUser(userData, hashedPassword);
  }
  public async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (
      user &&
      (await bcrypt.compare(password, user.password.hashedPassword))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  public async createSession(user: any) {
    const payload = { email: user.email, sub: user.id };
  
    const accessToken = this.jwtService.sign(payload, {
      secret: 'xrwe4543534',
      expiresIn: '12h',
    });
  
    return {
      access_token: accessToken,
    };
  }
}
