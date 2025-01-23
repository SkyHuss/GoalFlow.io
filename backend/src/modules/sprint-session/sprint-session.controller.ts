import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SprintSession } from "./entities/sprint-session.entity";
import { SprintSessionService } from "./sprint-session.service";

const fakeSession: SprintSession = {
    id: 1,
    name: 'Le nom de ma premiere session',
    description: 'Une petite description',
    image: undefined,
    startDate: new Date(),
    creationDate: new Date(),
    dueDate: new Date(),
}

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
    create(@Body() session: SprintSession): Promise<SprintSession> {
        return this.sprintSessionService.create(session)
    }

    // @Put(':id')
    // update(@Param('id') id: string) {
    //     return `mise a jour de la session ${id}` 
    // }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void>{
        return this.sprintSessionService.delete(id);
    }

}