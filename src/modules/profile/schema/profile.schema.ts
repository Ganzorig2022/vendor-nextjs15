import { z } from 'zod'

// Zod validation schemas
export const merchantSchema = z.object({
  customerType: z.string().min(1, "Харилцагчийн төрөл оруулна уу"),
  merchantName: z.string().min(1, "Мерчантын нэр оруулна уу"),
  lastName: z.string().min(1, "Овог оруулна уу"),
  processCode: z.string().min(1, "Процесс код оруулна уу"),
  firstName: z.string().min(1, "Нэр оруулна уу"),
  quickQrName: z.string().min(1, "Quick Qr Клейнт нэр оруулна уу"),
  register: z.string().min(1, "Регистр оруулна уу"),
})

export const userSchema = z.object({
  username: z.string().min(1, "Нэвтрэх нэр оруулна уу"),
  userLastName: z.string().min(1, "Овог оруулна уу"),
  position: z.string().min(1, "Албан тушаал оруулна уу"),
  userFirstName: z.string().min(1, "Нэр оруулна уу"),
  userRegister: z.string().min(1, "Регистр оруулна уу"),
  email: z.email("Зөв цахим хаяг оруулна уу"),
  phone: z.string().min(1, "Утас оруулна уу"),
})

export const recoverPassSchema = z.object({
  oldPassword: z.string().min(1, "Хуучин нууц үгээ оруулна уу"),
  newPassword: z.string().min(1, "Шинэ нууц үгээ оруулна уу"),
  confirmPassword: z.string().min(1, "Шинэ нууц үгээ дахин оруулна уу"),
})