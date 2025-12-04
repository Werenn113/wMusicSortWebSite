import ConnectedAccount from '#models/connected_account'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'


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
                providerUserId: spotifyUser.id,
                accessToken: spotifyUser.token.token,
                refreshToken: spotifyUser.token.refreshToken,
                expiresAt: DateTime.now().plus({seconds: spotifyUser.token.expiresIn})
            }
        )

        return {
            message: "Comtpe Spotify lié avec succrès !"
        }
    }
}