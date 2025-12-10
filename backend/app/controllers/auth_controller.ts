import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";

export default class AuthController {
    async register({ request, response, auth }: HttpContext) {
        const validator = vine.compile(
            vine.object({
                username: vine.string().trim().minLength(3).maxLength(50),
                email: vine.string().email().unique(async (db, value) => {
                    const user = await db.from('users').where('email', value).first()
                    return !user // retourne true si l'email est libre
                }),
                password: vine.string().minLength(6) // TODO : Changer ça
            })
        )

        const payload = await request.validateUsing(validator)
        const user = await User.create(payload)

        await auth.use('web').login(user)

        return response.status(201).json({
            message: 'Utilisateur créé et connecté avec succès',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })
    }


    async login({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        const user = await User.verifyCredentials(email, password)
        
        await auth.use('web').login(user)

        return response.status(200).json({
            message: "Utilisateur connecté avec succès",
            user: {
                id: user.id,
                email: user.email
            }
        })
    }

    
    async logout({ response, auth}: HttpContext) {
        await auth.use('web').logout()

        return response.status(200).json({
            message: "Déconnexion réussie"
        })
    }


    async delete_user({ response, auth }: HttpContext) {
        const user = auth.user!

        await auth.use('web').logout()

        await user.delete()

        return response.status(200).json({
            message: "Utilisateur supprimé avec succès"
        })
    }

    async userData({ response, auth}: HttpContext) {
        const user = auth.user!

        return response.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email
        })
    }
}