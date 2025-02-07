import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintSession } from './entities/sprint-session.entities';
import { SprintSessionController } from './sprint-session.controller';
import { SprintSessionService } from './sprint-session.service';

@Module({
  imports: [TypeOrmModule.forFeature([SprintSession])],
  controllers: [SprintSessionController],
  providers: [SprintSessionService],
})
export class SprintSessionModule {}
