import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().describe('Username').min(1, 'Нэвтрэх нэр оруулна уу'),
  password: z.string().describe('Password').min(1, 'Нууц үгээ орууулна уу'),
})
