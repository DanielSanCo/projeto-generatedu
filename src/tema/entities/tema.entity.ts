import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//12
@Entity({ name: "tb_temas" })
export class Tema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120, nullable: false})
    educacao: string;
    
    @Column({length: 255, nullable: false})
    serie: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]
}