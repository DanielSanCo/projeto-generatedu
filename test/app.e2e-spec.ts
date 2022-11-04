import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let app: INestApplication;
  let token: any;
  let usuarioId: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_projeto_generatedu_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar Usuario', async () => {
    const reposta = await request(app.getHttpServer())
      .post('/usuario/cadastrar')
      .send({
        name: 'Root',
        nickname: 'oort',
        usuario: 'root@root.com',
        password: 'rootroot',
        photo: ''
      });
    expect(201)

    usuarioId = reposta.body.id;
  });

  it('02 - Deve Autenticar Usuario (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/auth/logar')
      .send({
        usuario: 'root@root.com',
        password: 'rootroot'
      });
    expect(200)

    token = resposta.body.token;
  })

  it('03 - Não Deve Duplicar o Usuário', async () => {
    return request(app.getHttpServer())
      .post('/usuario/cadastrar')
      .send({
        name: 'Root',
        nickname: 'oort',
        usuario: 'root@root.com',
        password: 'rootroot',
        photo: ''
      })
      .expect(400)
  });

  it('04 - Deve Listar todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuario/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  });

  it('05 - Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuario/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        name: 'Root Atualizado',
        nickname: 'oort',
        usuario: 'root@root.com',
        password: 'rootroot',
        photo: ''
      })
      .expect(200)
      .then(resposta => {
        expect("Root Atualizado").toEqual(resposta.body.name);
      })
  })
});
