import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

/**
 * Contrôleur responsable de l'authentification et de la gestion des utilisateurs
 * @class AuthController
 */
export default class AuthController {
    /**
     * Enregistre un nouvel utilisateur et le connecte automatiquement
     * @param {HttpContext} context - Contexte HTTP contenant request, response et auth
     * @returns {Promise<void>} JSON avec message de succès et données utilisateur
     * @throws {ValidationException} Si les données fournies sont invalides
     */
    async register({ request, response, auth }: HttpContext) {
        const validator = vine.compile(
            vine.object({
                username: vine.string().trim().minLength(3).maxLength(50),
                email: vine.string().email().unique(async (db, value) => {
                    const user = await db.from('users').where('email', value).first()
                    return !user // returns true if email is available
                }),
                password: vine.string().minLength(6) // TODO: Change this
            })
        )

        const payload = await request.validateUsing(validator)
        const user = await User.create(payload)

        await auth.use('web').login(user)

        return response.status(201).json({
            message: 'User created and logged in successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })
    }

    /**
     * Authentifie un utilisateur existant avec email et mot de passe
     * @param {HttpContext} context - Contexte HTTP contenant request, response et auth
     * @returns {Promise<void>} JSON avec message de succès et données utilisateur
     * @throws {InvalidCredentialsException} Si les identifiants sont incorrects
     */
    async login({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        
        if (!email || !password) {
            return response.badRequest({
                error: 'Email et mot de passe sont requis'
            })
        }
        
        const user = await User.verifyCredentials(email, password)
        
        await auth.use('web').login(user)

        return response.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })
    }

    /**
     * Déconnecte l'utilisateur actuellement authentifié
     * @param {HttpContext} context - Contexte HTTP contenant response et auth
     * @returns {Promise<void>} JSON avec message de confirmation
     */
    async logout({ response, auth}: HttpContext) {
        await auth.use('web').logout()

        return response.status(200).json({
            message: "Logout successful"
        })
    }

    /**
     * Supprime le compte de l'utilisateur actuellement authentifié
     * Déconnecte l'utilisateur avant de supprimer son compte
     * @param {HttpContext} context - Contexte HTTP contenant response et auth
     * @returns {Promise<void>} JSON avec message de confirmation
     */
    async delete_user({ response, auth }: HttpContext) {
        const user = auth.user!

        await auth.use('web').logout()

        await user.delete()

        return response.status(200).json({
            message: "User deleted successfully"
        })
    }

    /**
     * Récupère les données de l'utilisateur actuellement authentifié
     * @param {HttpContext} context - Contexte HTTP contenant response et auth
     * @returns {Promise<void>} JSON avec id, username et email de l'utilisateur
     */
    async userData({ response, auth}: HttpContext) {
        const user = auth.user!

        return response.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email
        })
    }
}