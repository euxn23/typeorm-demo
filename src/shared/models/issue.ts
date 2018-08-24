import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user'

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  content: string

  @ManyToMany(_ => User)
  @JoinTable()
  users: User[]

  constructor(content: string) {
    this.content = content
  }
}
