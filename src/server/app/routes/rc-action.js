
import { action } from '../handlers/add-in-action'

export default (app) => {
  app.post('/rc/action', action)
}
