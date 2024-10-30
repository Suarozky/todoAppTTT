import { Injectable } from '@nestjs/common';
import User from '../databases/rds/entities/user.entity'; // Asegúrate de tener la importación correcta
import { CustomJwtService } from './../jwt/jtw.service'; // Asegúrate de tener la importación correcta
import { UserService } from '../services/modules/users/users.service'; // Asegúrate de tener la importación correcta
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: CustomJwtService,
  ) {}

  async register(registerDto: {
    email: string;
    password: string;
    userName: string;
  }): Promise<{ accessToken: string; user: User }> {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear nuevo usuario
    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      userName: registerDto.userName,
    });

    // Generar el token para el nuevo usuario
    const token = this.jwtService.generateToken(user);

    // Devuelve el token y el usuario
    return { accessToken: token, user };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; user: User }> {
    // Buscar usuario por correo electrónico
    const user = await this.usersService.findByEmail(email);

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    // Generar el token para el usuario
    const token = this.jwtService.generateToken(user);

    // Devuelve el token y el usuario
    return { accessToken: token, user };
  }
}
