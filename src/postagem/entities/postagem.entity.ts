import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_postagem"})
export class Postagem {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    titulo: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    conteudo: string;

    @UpdateDateColumn()
    data: Date;

    @Column({ nullable: true })
    curtida: number;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ManyToOne(() => Usuario, (Usuario) => Usuario.postagem,{
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}