
const assetBucket = 'https://s3.us-east-2.amazonaws.com/magiei2/public/'

const logoS3 = (name = '', extension = 'png') => {
    return `${assetBucket}img/logos/${name}.${extension}`
}

const iconS3 = (name = '') => {
    return `${assetBucket}img/icons/${name}.svg`
}

const animationS3 = (name = '') => {
    return `${assetBucket}animations/${name}.json`
}

export { logoS3, animationS3, iconS3, assetBucket }