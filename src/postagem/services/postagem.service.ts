import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository, DeleteResult } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {
                tema: true,
                usuario: true
            }
        });
    }
    //7
    async findById(id: number): Promise<Postagem> {
        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations:{
                tema: true,
                usuario: true
            }
        });

        if(!postagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

            return postagem;
    }
    //9
    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                tema: true,
                usuario: true
            }
        })
    }
    //10
    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }
    //10
    async update(postagem: Postagem): Promise<Postagem> {
        let buscarPostagem: Postagem = await this.findById(postagem.id);

        if(!buscarPostagem || !postagem.id)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return await this.postagemRepository.save(postagem)
    }
    //11
    async delete(id: number): Promise<DeleteResult> {
        let buscarPostagem = await this.findById(id)

        if(!buscarPostagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

        return await this.postagemRepository.delete(id)
    }
}