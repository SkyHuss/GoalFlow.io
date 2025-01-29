import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintSession } from './entities/sprint-session.entity';
import { CreateSprintSessionDto } from './dto/create-sprint-session.dto';

@Injectable()
export class SprintSessionService {
  constructor(
    @InjectRepository(SprintSession)
    private sprintSessionRepository: Repository<SprintSession>,
  ) {}

  findAll(): Promise<SprintSession[]> {
    return this.sprintSessionRepository.find();
  }

  findById(id: number): Promise<SprintSession | null> {
    return this.sprintSessionRepository.findOne({ where: { id } });
  }

  create(
    createSessionDto: CreateSprintSessionDto,
    pictureUrl: string | undefined,
  ): Promise<SprintSession> {
    const session = this.sprintSessionRepository.create({
      ...createSessionDto,
      image: pictureUrl,
      creationDate: new Date(),
    });
    console.log("cououcccccccccccccccccccc: ", session, pictureUrl)
    return this.sprintSessionRepository.save(session);
  }

  async delete(id: number): Promise<void> {
    await this.sprintSessionRepository.delete(id);
  }
}
