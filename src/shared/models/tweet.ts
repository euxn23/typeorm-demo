import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Tweet {
  static USER = 'user'

  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  text: string

  @ManyToOne(_ => User, user => user.tweets)
  user: User

  constructor(text: string, user: User) {
    this.text = text
    this.user = user
  }
}
