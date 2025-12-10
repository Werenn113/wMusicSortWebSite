import z from "zod";

export const loginSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string("Password is required")
})

export const registerSchema = z.object({
    email: z.email("Email invalide"),
    username: z.string("Username is required").min(3, "Le username est trop court").max(50, "Le username est trop long"),
    password: z.string("Password is required")
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>