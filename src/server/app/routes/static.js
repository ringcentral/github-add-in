/**
 * static route
 */
import Express from 'express'
import { resolve } from 'path'

export default (app) => {
  const staticPath = resolve(__dirname, '../../dist/static')
  app.use(Express.static(staticPath))
}
