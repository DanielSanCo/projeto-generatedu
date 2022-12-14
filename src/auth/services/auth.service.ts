import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService, 
        private jwtService: JwtService, 
        private bcrypt: Bcrypt) {}

    async ValidateUser(username: string, password: string): Promise<any> {
        const buscarUsuario = await this.usuarioService.findByUsuario(username)
        if(!buscarUsuario)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)
        const match = await this.bcrypt.compararSenha(buscarUsuario.password, password)
        if(buscarUsuario && match) {
            const {password, ...result} = buscarUsuario
            return result;
        }
        return null;
    }

    async login(usuarioLogin: any) {
        const payload = {userName: usuarioLogin.usuario, sub: "db_projeto_generatedu"}
        return {
            usuario: usuarioLogin.usuario,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }
}