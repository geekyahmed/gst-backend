import express, { Router } from 'express'

import { AuthRoutes } from './auth.route'
import { TimetableRoutes } from './timetable.route'
import { ResultRoutes } from './result.route'
import { UserRoutes } from './user.route'

const router = express.Router()

interface Route {
  path: string
  routes: Router
}

const routes: Route[] = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/timetables',
    routes: TimetableRoutes,
  },
  {
    path: '/results',
    routes: ResultRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  }
]

routes.forEach((route: Route) => {
  router.use(route.path, route.routes)
})

export { router }
