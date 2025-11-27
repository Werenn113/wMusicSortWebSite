import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async redirect({ ally }: HttpContext) {
        return ally.use('spotify').redirect()
    }

    async callback({ ally }: HttpContext) {
        const spotify = ally.use('spotify')

        if (spotify.accessDenied()) {
            return spotify.getError()
        }

        const user = await spotify.user()

        return {
            message: 'Connexion réussie',
            nom: user.name,
            accessToken: user.token.token
        }
    }
}