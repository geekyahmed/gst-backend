import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt'

import { config } from './config'

import { User } from '../models'

import { Payload } from '../types/token.type'

const options: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

async function verifyJwt(
  payload: Payload,
  done: VerifiedCallback,
): Promise<void> {
  try {
    const user = await User.findById(payload.sub)
      .select('-password')

    if (!user) {
      done(null, false)
    } else {
      done(null, user)
    }
  } catch (error) {
    done(error, false)
  }
}

const strategy = new Strategy(options, verifyJwt)

export { strategy }
