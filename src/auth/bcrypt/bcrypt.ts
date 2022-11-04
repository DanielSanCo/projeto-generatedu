import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{

    async criptografarSenha(password: string): Promise<string> {
        let saltos: number = 10
        return await bcrypt.hash(password, saltos);
    }

    async compararSenha(senhaBanco: string, senhaDigitada: string): Promise<boolean> {
        return bcrypt.compareSync(senhaDigitada, senhaBanco);
    }
}