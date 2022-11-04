import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { ILike, Repository, DeleteResult } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) {}

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find(
            {
                relations:{
                    postagem: true
                }
            }
        );

    }
    //7
    async findById(id: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if(!usuario)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)

            return usuario;
    }
    //9
    async findByName(name: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                name: ILike(`%${name}%`)
            }
        })
    }

    async findByNickname(nickname: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                nickname: ILike(`%${nickname}%`)
            },
            relations: {
                postagem: true
            }
        })
    }

    async findByUsuario (usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            },
            relations: {
                postagem: true
            }
        })
    
    }
    //10
    async create(usuario: Usuario): Promise<Usuario> {
        let buscarUsuario = await this.findByUsuario(usuario.usuario)

        if(!buscarUsuario) {
            usuario.password = await this.bcrypt.criptografarSenha(usuario.password)
            return await this.usuarioRepository.save(usuario)
        }
        throw new HttpException('O Usuario já está cadastrado', HttpStatus.BAD_REQUEST)
    }
    //10
    async update(usuario: Usuario): Promise<Usuario> {

        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (!updateUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.password = await this.bcrypt.criptografarSenha(usuario.password)
        return await this.usuarioRepository.save(usuario);

    }
    //11
}