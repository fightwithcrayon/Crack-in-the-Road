const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
} = require('next/constants')

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = phase => {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER
	const isProd = phase === PHASE_PRODUCTION_BUILD

	console.log(`isDev:${isDev}  isProd:${isProd}`)

	const env = {
		API_URL: (() => {
			if (isDev) return 'http://localhost:1337'
			if (isProd) {
				return 'https://api.crackintheroad.com'
			}
			return 'API_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
		})(),
	}

	// next.config.js object
	return {
		env,
	}
}