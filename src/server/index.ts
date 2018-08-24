import { createConnection } from 'typeorm'
import 'reflect-metadata'
import { User } from '../shared/models/user'
import { Tweet } from '../shared/models/tweet'

const main = async () => {
  const connection = await createConnection()

  const userRepository = connection.getRepository(User)
  const tweetRepository = connection.getRepository(Tweet)

  const satoshi = new User('satoshi')
  await userRepository.save(satoshi)
  const satoshiTweet = new Tweet('Hello bitcoin world', satoshi)
  await tweetRepository.save(satoshiTweet)
  await tweetRepository.save(new Tweet('this is my second tweet', satoshi)) // <- OK

  const yuta = new User('yuta')
  await userRepository.save(yuta)
  const yutaTweet = new Tweet('I am yuta', yuta)

  /* shorthands
  const yutaTweet = new Tweet('I am yuta', new User('yuta'))
  // ^ SQL Syntax Error because USER is not saved.

  const yutaTweet = new Tweet('I am yuta', await userRepository.save(new User('yuta')))
  // ^ OK but redundant.

  // if you're using active record pattern,
  const yutaTweet = new Tweet('I am yuta', await new User('yuta').save()) <- OK, bun DON'T forget `await`
  // */

  await tweetRepository.save(yutaTweet)

  const allTweets = await tweetRepository.find({ relations: [Tweet.USER] })
  allTweets.forEach(t =>
    console.log(`id: ${t.id}, user: ${t.user.name}, text: ${t.text}`)
  )
  const foundSatoshi = await userRepository.findOne({
    where: { name: 'satoshi' },
    relations: [User.TWEETS]
  })
  foundSatoshi.tweets.forEach(st =>
    console.log(`id: ${st.id}, text: ${st.text}`)
  )
  // [WARN]: st.USER relation is not included by simple relations definition.
}

main().catch(e => console.error(e))
