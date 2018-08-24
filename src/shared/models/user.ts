import { Issue } from './issue'
import { Tweet } from './tweet'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class User {
  static TWEETS = 'tweets'

  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  name: string

  @ManyToMany(_ => Issue)
  @JoinTable()
  issues: Issue[]

  @OneToMany(_ => Tweet, tweet => tweet.user)
  tweets: Tweet[]

  constructor(name: string) {
    this.name = name
  }

  /* Decorators causes error.
  constructor(
    @Column() public name: string,
    @ManyToMany(_ => Issue)
    @JoinTable()
    public issues?: Issue[],
    @OneToMany(_ => Tweet, tweet => tweet.USER) public TWEETS?: Tweet[]
  ) {}
  */
}
