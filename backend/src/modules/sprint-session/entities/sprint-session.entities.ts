import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('sprint_sessions')
export class SprintSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  creationDate: Date;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
