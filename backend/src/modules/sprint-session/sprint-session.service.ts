import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SprintSession } from "./entities/sprint-session.entity";

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
        return this.sprintSessionRepository.findOne({where: {id}});
    }

    create(session: SprintSession): Promise<SprintSession> {
        console.log('je cree')
        return this.sprintSessionRepository.save(session);
    }

    async delete(id: number): Promise<void> {
        await this.sprintSessionRepository.delete(id);
    }
}