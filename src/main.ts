import { logger } from './utils/logger'
import express, { Application, Request, Response } from 'express'

logger.info(
  `🐳 NODE_ENV: ${process.env.NODE_ENV}, APP_ENV: ${process.env.APP_ENV}, node version: ${process.version}`,
)

const bootstrap = () => {
  const app: Application = express()

  app.get('/health', (_: Request, res: Response) => {
    const message = 'Hola, 🛸'
    res.status(200).json({ message })
  })

  app.listen(process.env.APP_SERVICE_PORT)
}

bootstrap()
