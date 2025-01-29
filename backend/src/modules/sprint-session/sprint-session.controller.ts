import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SprintSession } from './entities/sprint-session.entity';
import { SprintSessionService } from './sprint-session.service';
import { CreateSprintSessionDto } from './dto/create-sprint-session.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('sprint-session')
export class SprintSessionController {
  constructor(private readonly sprintSessionService: SprintSessionService) {}

  @Get()
  findAll(): Promise<SprintSession[]> {
    return this.sprintSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SprintSession | null> {
    return this.sprintSessionService.findById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads/sprint-session', // Dossier où les fichiers seront stockés
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
    console.log("file:", file)
    const imageUrl = file
      ? `/uploads/sprint-session/${file.filename}`
      : undefined;
    return this.sprintSessionService.create(session, imageUrl);
  }

  // @Put(':id')
  // update(@Param('id') id: string) {
  //     return `mise a jour de la session ${id}`
  // }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.sprintSessionService.delete(id);
  }
}
