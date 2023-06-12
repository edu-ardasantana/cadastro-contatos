import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { Aluno } from './aluno.entity';
import { promises } from 'dns';

@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunosServise: AlunosService) {}

    //GET /alunos => lista todos os alunos cadastrados
    @Get()
    async findAll(): Promise<Aluno[]> {
        return this.alunosServise.findAll();
    }

    // POST /alunos => salva os dados de um aluno no banco de dados
    @Post()
    async create(@Body() aluno: Aluno): Promise<Aluno> {
        return this.alunosServise.create(aluno);
    }

    // PUT /alunos/id => atualiza os dados de um aluno já cadastrado
    @Put(':id')
    async update (@Param('id') id: number, @Body() aluno: Aluno): Promise<any> {
        return this.alunosServise.update(id, aluno);
    }

    // DELETE /alunos/id => remove um aluno no banco 
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        const aluno = await this.alunosServise.findOne(id);
        if (!aluno) {
            throw new NotFoundException('Aluno não existe!');
        }
        return this.alunosServise.delete(id);
    }

    // GET /alunos/id => recupera as informacções de um aluno específico
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Aluno> {
        const aluno = await this.alunosServise.findOne(id);
        if(!aluno) {
            throw new NotFoundException('Aluno não existe!');
        } else {
            return aluno;
        }
    }
  
}
