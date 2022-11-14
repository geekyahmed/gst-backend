import { Document } from 'mongoose'

import { UserDocument, UserEmail } from './user.type'

type BearerToken = string
type Issuer = string

interface Token {
  token: BearerToken
  user: UserEmail
  expirationDate: Date
}

interface TokenResponse {
  token: BearerToken
  expirationDate: Date
}

type TokenDocument = Token & Document

interface Payload {
  sub: UserDocument['_id']
  iat: number
  exp: number
  issuer: Issuer
}

export { Token, TokenDocument, TokenResponse, Payload, BearerToken }
