import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintSession } from './entities/sprint-session.entity';
import { CreateSprintSessionDto } from './dto/create-sprint-session.dto';
import { ModifySprintSessionDto } from './dto/modify-sprint-session.dto';

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
    return this.sprintSessionRepository.save(session);
  }

  async delete(id: number): Promise<void> {
    await this.sprintSessionRepository.delete(id);
  }

  async update(
    modifySessionDto: ModifySprintSessionDto,
    imageUrl: string | undefined,
  ): Promise<SprintSession> {
    const session = await this.findById(modifySessionDto.id);

    if (!session) {
      throw new NotFoundException(
        `Sprint session with ID ${modifySessionDto.id} not found`,
      );
    }

    session.name = modifySessionDto.name ?? session.name;
    session.description = modifySessionDto.description ?? session.description;
    session.startDate = modifySessionDto.startDate
      ? new Date(modifySessionDto.startDate)
      : session.startDate;
    session.dueDate = modifySessionDto.dueDate
      ? new Date(modifySessionDto.dueDate)
      : session.dueDate;
    session.image = imageUrl;

    return this.sprintSessionRepository.save(session);
  }
}
