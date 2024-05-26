import {Routes} from 'express'

const routes = Routes()

// defiine microservice routes...

const services = [
  {
    route: '/auth',
    target: 'https://zerosquadron.com/api/createAccount',
  },
  {
    route: '/users',
    target: 'https://zerosquadron.com/api/user'
  },
  {
    route: '/weather',
    target: 'https://zerosquadron.com/api/weather',
  }
]