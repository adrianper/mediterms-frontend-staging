import { useCallback, useRef } from "react"
import { Link as PageLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"

import { routes } from "routing/routes"

import { setUser } from "reduxStore/reducers/auth/authSlice"

import { Button, Grid, Icon, Text } from "components"

import EducationalBackground from "./EducationalBackground"

import { DEFAULT_PROFILE_PHOTO, handleClickSocialMediaIcon } from "./AccountProfileInfo.utils"

import "./account_profile_info.scss"

const AccountProfileInfo = ({ topicWithTotal, ranking, setAccountPage }) => {
    const auth = useSelector((store) => store.auth)

    const dispatch = useDispatch()

    const $userPictureRef = useRef()

    const logOut = () => {
        window.clearSession()
        document.location.reload()
    }

    const changeUserPhoto = useCallback((event) => {
        const options = {
            url: "/user/upload",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
                formData: { file: event.target.files[0] },
            },
        }
        axios(options)
            .then((response) => {
                $userPictureRef.current.value = ""
                const user = JSON.parse(localStorage.getItem("user"))
                user.photoUrl = response.data.photoUrl
                localStorage.setItem("user", JSON.stringify(user))
                dispatch(setUser({ photoUrl: response.data.photoUrl }))
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const totalAnswers = topicWithTotal.find(({ topic_name }) => topic_name === "Total")?.total

    const imageClassName =
        auth.user.photoUrl === DEFAULT_PROFILE_PHOTO || auth.user.photoUrl === ""
            ? "user_info__default"
            : "account__user_photo"

    return (
        <>
            <Grid w100 columns="auto 1fr auto 1fr auto" itemsX="center" itemsY="center" className="heading_info_container">
                <PageLink to={routes.ranking.path}>
                    <Grid className="change_page_button">
                        <Text style={{ visibility: "hidden" }}>&nbsp;</Text>
                        <Icon icon='arrow' direction="bottom" />
                    </Grid>
                </PageLink>
                <Grid>
                    <Text color="white">Ranking</Text>
                    <Text bold color="white" className="heading_info__text_value" align="center">{ranking || "-"}</Text>
                </Grid>
                <Grid itemsX="center" gap="0.7em" style={{ zIndex: 1 }}>
                    <input
                        className="account__user_input_photo"
                        type="file"
                        ref={$userPictureRef}
                        name="myImage"
                        onChange={(event) => {
                            changeUserPhoto(event)
                        }}
                    />
                    <img src={auth.user.photoUrl || DEFAULT_PROFILE_PHOTO} className={imageClassName} />
                </Grid>
                <Grid>
                    <Text color="white">Respuestas</Text>
                    <Text bold color="white" className="heading_info__text_value" align="center">{totalAnswers}</Text>
                </Grid>
                <Grid onClick={() => setAccountPage(2)} className="change_page_button">
                    <Text style={{ visibility: "hidden" }}>&nbsp;</Text>
                    <Icon icon='arrow' />
                </Grid>
            </Grid>

            <Grid w100 gap="1.71em" itemsX="center" className="account__user_info">
                <Grid>
                    <Text medium align="center">{auth.user.name}</Text>
                    <Text medium align="center">{auth.user.email}</Text>
                </Grid>

                <EducationalBackground />

                <PageLink to={routes.changePassword.path}>
                    <Button>Cambiar contraseña</Button>
                </PageLink>

                <Grid gap="0.8em" style={{ marginTop: "0.8em" }}>
                    <Text bold size="5" color="first" align="center">
                        ¿Dudas o aclaraciones?
                    </Text>
                    <Text medium align="center" color="first">
                        Siguenos en nuestras redes sociales
                    </Text>
                </Grid>

                <Grid columns="1fr 1fr 1fr" style={{ gap: "inherit" }}>
                    <Grid className="account__img_container">
                        <img
                            src="https://mediterms-resources.s3.us-east-2.amazonaws.com/img/facebook-logo.svg"
                            className="account__rss_logo"
                            onClick={() => { handleClickSocialMediaIcon("facebook") }}
                        />
                    </Grid>
                    <Grid className="account__img_container">
                        <img
                            src="https://mediterms-resources.s3.us-east-2.amazonaws.com/img/instagram-logo.svg"
                            className="account__rss_logo"
                            onClick={() => { handleClickSocialMediaIcon("instagram") }}
                        />
                    </Grid>
                    <Grid className="account__img_container">
                        <img
                            src="https://mediterms-resources.s3.us-east-2.amazonaws.com/img/tiktok-logo.svg"
                            className="account__rss_logo"
                            onClick={() => { handleClickSocialMediaIcon("tiktok") }}
                        />
                    </Grid>
                </Grid>

                <PageLink to={routes.privacy.path}>
                    <Text bold className="text--underline" color="first">
                        AVISO DE PRIVACIDAD
                    </Text>
                </PageLink>
            </Grid>

            <Button style={{ marginTop: "0.52em" }} onClick={logOut} className="account__logout">
                Cerrar sesión
            </Button>
            <PageLink to={routes.account_deletion.path}>
                <Button style={{ backgroundColor: "var(--bg-color--error)" }}>Eliminar cuenta</Button>
            </PageLink>
        </>
    )
}

export default AccountProfileInfo