import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";

export default class AuthController {
    async register({ request, response, auth }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        const existingUser = await User.findBy('email', email)
        if (existingUser) {
            return response.status(400).json({ error: 'Email déjà utilisée'})
        }

        const user = new User()
        user.email = email
        user.password = password
        await user.save()

        await auth.use('web').login(user)

        return response.status(201).json({
            message: 'Utilisateur créé et connecté avec succès',
            user: {
                id: user.id,
                email: user.email
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
}