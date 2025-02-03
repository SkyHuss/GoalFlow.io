import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs';
import { SprintSession } from './entities/sprint-session.entity';
import { SprintSessionService } from './sprint-session.service';
import { CreateSprintSessionDto } from './dto/create-sprint-session.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ModifySprintSessionDto } from './dto/modify-sprint-session.dto';

@Controller('sprint-session')
export class SprintSessionController {
  constructor(private readonly sprintSessionService: SprintSessionService) {}

  @Get()
  findAll(): Promise<SprintSession[]> {
    return this.sprintSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SprintSession | null> {
    return this.sprintSessionService.findById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/sprint-session',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() session: CreateSprintSessionDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<SprintSession> {
    const imageUrl = file
      ? `/uploads/sprint-session/${file.filename}`
      : undefined;
    return this.sprintSessionService.create(session, imageUrl);
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/sprint-session',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Body() session: ModifySprintSessionDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<SprintSession> {
    const storedSession = await this.sprintSessionService.findById(session.id);
    if (!storedSession) {
      throw new Error('Sprint session not found');
    }

    let imageUrl = storedSession.image;

    if (file) {
      // Une nouvelle image est envoyée, donc on supprime l'ancienne et on met à jour
      if (imageUrl) {
        const oldImagePath = `.${imageUrl}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `/uploads/sprint-session/${file.filename}`;
    } else if (session.image === 'null') {
      // L'utilisateur a explicitement supprimé l'image, donc on supprime de l'image existante
      if (imageUrl) {
        const oldImagePath = `.${imageUrl}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = undefined; // Suppression de l'image
    }

    return this.sprintSessionService.update(session, imageUrl);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const storedSession = await this.sprintSessionService.findById(id);
    if (!storedSession) {
      throw new Error('Session not found');
    }

    if (storedSession.image) {
      const imagePath = `.${storedSession.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await this.sprintSessionService.delete(id);
  }
}
