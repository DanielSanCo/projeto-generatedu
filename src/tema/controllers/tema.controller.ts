import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Tema } from "../entities/tema.entity";
import { TemaService } from "../services/tema.service";

@Controller("/tema")
export class TemaController {
  constructor(private readonly temaService: TemaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tema[]> {
    return this.temaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findById(id);
  }

  @Get('/serie/:serie')
    @HttpCode(HttpStatus.OK)
    findBySerie(@Param('serie') serie: string): Promise<Tema[]> {
        return this.temaService.findBySerie(serie)
    }

  @Get('/educacao/:educacao')
    @HttpCode(HttpStatus.OK)
    findByEducacao(@Param('educacao') educacao: string): Promise<Tema[]> {
        return this.temaService.findByEducacao(educacao)
    }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Tema: Tema): Promise<Tema> {
    return this.temaService.create(Tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Tema: Tema): Promise<Tema> {
    return this.temaService.update(Tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.temaService.delete(id);
  }

}