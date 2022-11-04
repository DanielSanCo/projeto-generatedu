import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";

@Controller("/usuario")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('name') name: string): Promise<Usuario[]> {
        return this.usuarioService.findByName(name)
    }

    @Get('/email/:usuario')
    @HttpCode(HttpStatus.OK)
    findByUsuario(@Param('usuario') usuario: string): Promise<Usuario> {
        return this.usuarioService.findByUsuario(usuario)
    }

  @Get('/nickname/:nickname')
    @HttpCode(HttpStatus.OK)
    findByNickname(@Param('nickname') nickname: string): Promise<Usuario[]> {
        return this.usuarioService.findByNickname(nickname)
    }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(Usuario);
  }

}