import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sprint_sessions')
export class SprintSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string; //chemin de l image

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  creationDate: Date;

  @Column({ type: 'timestamp' })
  dueDate: Date;
}
