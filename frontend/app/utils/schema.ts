import z from "zod";

/**
 * Schéma de validation Zod pour le formulaire de connexion.
 * 
 * Valide les données d'authentification de l'utilisateur.
 * 
 * @property email - Adresse email valide (validation automatique)
 * @property password - Mot de passe requis
 */
export const loginSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string("Password is required")
})

/**
 * Schéma de validation Zod pour le formulaire d'enregistrement.
 * 
 * Valide les données d'inscription d'un nouvel utilisateur.
 * 
 * @property email - Adresse email valide
 * @property username - Nom d'utilisateur (3-50 caractères)
 * @property password - Mot de passe requis
 */
export const registerSchema = z.object({
    email: z.email("Email invalide"),
    username: z.string("Username is required").min(3, "Le username est trop court").max(50, "Le username est trop long"),
    password: z.string("Password is required")
})

/** Type TypeScript inféré du schéma de connexion */
export type LoginSchema = z.infer<typeof loginSchema>

/** Type TypeScript inféré du schéma d'enregistrement */
export type RegisterSchema = z.infer<typeof registerSchema>