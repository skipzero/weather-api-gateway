import {Routes} from 'express'

const routes = Routes()

// defiine microservice routes...

const services = [
  {
    route: 'auth',
    target: 'https://zerosquadron.com/api/users',
  },
  {
    route: 'weather',
    target: 'https://zerosquadron.com/api/weather',
  }
]