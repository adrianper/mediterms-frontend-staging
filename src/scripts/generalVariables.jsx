const isDevelopmentEnv = true

export const ENVS = isDevelopmentEnv
	? {
			hostUrl: "http://localhost:3000",
			socketUrl: "http://localhost:8080",
			stripePK:
				"pk_test_51MQxscExfdqgYaIWZMyVRH3iKAWGC5V0edDA599q4KDvADnWyW5pFPTJYadjiTGe6udYGZwlQDzVPeu2zn2dXOQ100PU63iJAG",
	  }
	: {
			hostUrl: "https://api.mediterms.app/",
			socketUrl: "https://fp-api.magiei.app",
			stripePK:
				"pk_live_51MQxscExfdqgYaIWLCQTtXpwTMTPy8WyE2lQD9qHyDTswIAncvaZPX9yxzTibhS94AnDOreoECpanSay0OO18Qja00PEDA7HeM",
	  }

export const screenSizes = {
	mobile: 0,
	tablet: 480,
	laptop: 768,
	desktop: 1024,
	tv: 1440,
	"4k": 2500,
}

export const notValidTokenCodes = [
	"MDT_APP_TOKEN_NOT_VALID",
	"FST_JWT_AUTHORIZATION_TOKEN_INVALID",
	"FST_JWT_AUTHORIZATION_TOKEN_EXPIRED",
	"FST_JWT_NO_AUTHORIZATION_IN_HEADER",
]

export const isAdminSubdomain = admin// /:\/\/([^\/]+)/.exec(window.location.href)[1].split(".")[0] === 'admin'
