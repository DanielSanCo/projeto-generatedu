import { IsNotEmpty } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_usuarios'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    name: string;

    @IsNotEmpty()
    @Column({length: 30, nullable: false})
    nickname: string;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    usuario: string; //email

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    password: string;

    @Column({length: 5000, nullable: true})
    photo: string;

    @OneToMany(() => Postagem, (Postagem) => Postagem.usuario)
    postagem: Postagem[];
}