import ConnectedAccount from '#models/connected_account'
import type { HttpContext } from '@adonisjs/core/http'


export default class SocialsController {
    async redirect({ ally }: HttpContext) {
        return ally.use('spotify').redirect()
    }

    async callback({ ally, auth }: HttpContext) {
        const spotify = ally.use('spotify')

        if (spotify.accessDenied()) {
            return spotify.getError()
        }

        const spotifyUser = await spotify.user()
        const user = auth.user!

        await ConnectedAccount.updateOrCreate(
            {
                userId: user.id,
                provider: 'spotify'
            },
            {
                
            }
        )

        return {
            message: "Connexion réussie",
            nom: user.name,
            accessToken: user.token.token
        }
    }
}