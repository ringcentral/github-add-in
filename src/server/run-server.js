import app from './server'
import initDb from './app/common/init-db'

const {
  RINGCENTRAL_PORT: port,
  RINGCENTRAL_HOST: host,
  APP_HOME = '/'
} = process.env

app.listen(port, host, () => {
  console.log(`-> server running at: http://${host}:${port}${APP_HOME}`)
  initDb()
})
