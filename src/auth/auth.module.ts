import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants/constants';
import { Bcrypt } from './bcrypt/bcrypt';
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './services/auth.service';
import { UsuarioService } from '../usuario/services/usuario.service';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy, UsuarioService],
    controllers: [],
    exports: [Bcrypt]
})
export class AuthModule {}