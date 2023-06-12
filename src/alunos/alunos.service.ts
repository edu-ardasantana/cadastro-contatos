import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';

@Injectable()
export class AlunosService {
    constructor(
        @InjectRepository(Aluno)
        private alunoRepository: Repository<Aluno>,
    ) {}

    async findAll(): Promise<Aluno[]> {
        return this.alunoRepository.find()
    }

    async findOne(id: number): Promise<Aluno> {
        return this.alunoRepository.findOne({ where : { id }});
    }

    async create(aluno: Partial<Aluno>): Promise<Aluno> {
        const newAluno = this.alunoRepository.create(aluno);
        return this.alunoRepository.save(newAluno);
    }

    async update(id: number, aluno: Partial<Aluno>): Promise<Aluno> {
        await this.alunoRepository.update(id, aluno);
        return this.alunoRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.alunoRepository.delete(id);
    }
}
