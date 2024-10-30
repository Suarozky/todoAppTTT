import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../databases/rds/entities/user.entity';

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): string {
    // Payload del token
    const payload = { id: user.id, email: user.email };
    // Generar el token con un tiempo de expiración (ej. 1 hora)
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
