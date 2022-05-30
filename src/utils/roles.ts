import { registerEnumType } from 'type-graphql'

export enum Roles {
  ADMIN = 'admin',
  MAINTAINER = 'maintainer',
  USER = 'user',
  Supplier = 'Supplier',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'App roles for each user',
  valuesConfig: {
    ADMIN: {
      description: 'Access to all parameters',
    },
    MAINTAINER: {
      description: 'No access to destructive actions (delete)',
    },
    USER: {
      description: 'Read only permissions',
    },
  },
})
