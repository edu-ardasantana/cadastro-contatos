import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosModule } from './alunos/alunos.module';
import { ConfigModule } from '@nestjs/config';
import { Aluno } from './alunos/aluno.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AlunosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'contatos',
      entities: [Aluno],
      synchronize: true,
    }),
  AlunosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
