export const DEFAULT_PROFILE_PHOTO = "https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/icon-user-edit.svg"

export const handleClickSocialMediaIcon = (name) => {
    switch (name) {
        case "facebook":
            window.open("https://www.facebook.com/meditermsapp", "_blank")
            break
        case "instagram":
            window.open("https://www.instagram.com/meditermsapp", "_blank")
            break
        case "tiktok":
            window.open("https://www.tiktok.com/@meditermsapp", "_blank")
            break
        default:
            break
    }
}
