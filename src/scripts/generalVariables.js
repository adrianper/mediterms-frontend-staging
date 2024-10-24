// export const hostURL = 'https://api.mediterms.app/' 
export const hostURL = 'http://localhost:3000' /*(Development API Host)*/

export const screenSizes = {
    'mobile': 0,
    'tablet': 480,
    'laptop': 768,
    'desktop': 1024,
    'tv': 1440,
    '4k': 2500,
}

export const notValidTokenCodes = [
    'MDT_APP_TOKEN_NOT_VALID',
    'FST_JWT_AUTHORIZATION_TOKEN_INVALID',
    'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED',
    'FST_JWT_NO_AUTHORIZATION_IN_HEADER'
]