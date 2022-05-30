import { getModelForClass, prop, queryMethod } from '@typegoose/typegoose'
import { AsQueryMethod, ReturnModelType } from '@typegoose/typegoose/lib/types'
import { EmailAddressResolver } from 'graphql-scalars'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

import { Roles } from 'src/utils/roles'

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>
  findBySub: AsQueryMethod<typeof findBySub>
}

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email'],
) {
  return this.findOne({ email })
}

function findBySub(
  this: ReturnModelType<typeof User, QueryHelpers>,
  sub: User['sub'],
) {
  return this.findOne({ sub })
}

@queryMethod(findByEmail)
@queryMethod(findBySub)
@ObjectType()
export class User {
  @Field()
  _id: ObjectId

  @prop({ required: true, unique: true })
  sub: string

  @Field(() => EmailAddressResolver)
  @prop({ required: true, unique: true })
  email: string

  @Field(() => [String])
  @prop({ required: true, enum: Roles, type: [String], default: [Roles.USER] })
  roles: Roles[]

  @Field({ nullable: true })
  @prop()
  name?: string
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)
