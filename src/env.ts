import { z } from 'zod'

const envSchema = z.object( {
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string().min(1),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().min(1)
})

export const env = envSchema.parse(process.env)

