import { useEffect, useState } from "react"
import { useNavigate, Link as PageLink } from "react-router-dom"
import axios from "axios"

import { Button, Grid, Text } from "components"
import { routes } from "routing/routes"
import { useDispatch } from "react-redux"
import { reset } from "reduxStore/reducers/auth/authSlice"

import "./verified_account.scss"

const VerifiedAccount = () => {
	const [verifiedToken, setVerifiedToken] = useState("")
	const [verificationSuccess, setVerificationSuccess] = useState(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logOut = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("token")
		localStorage.clear()
		dispatch(reset())
		navigate("/login")
	}

	useEffect(() => {
		const url = new URL(window.location.href)
		if (url.hash.includes("=")) {
			setVerifiedToken(url.hash.split("=").pop())
			if (verifiedToken != "") {
				axios
					.post("/user/verify_email", {
						token: verifiedToken,
					})
					.then(function () {
						setVerificationSuccess(true)
					})
					.catch(function () {
						setVerificationSuccess(false)
					})
			}
		}
	}, [verifiedToken])

	return (
		<Grid w100 className="verified_account" padding="1.71em 0.62em">
			<Grid w100 padding="2.85em 1.1em" gap="1.71em" className="verified_account__container">
				{verificationSuccess ? (
					<Grid gap="1.71em">
						<Text medium align="center">
							!Tu cuenta ha sido verificada con éxito!
						</Text>
						<Text medium align="center">
							Ingresa a la app con tus credenciales
						</Text>
						<Grid gap="1.14em">
							<PageLink to={routes.login.path}>
								<Grid>
									<Button selfCenter onClick={() => logOut()}>
										Empezar a aprender
									</Button>
								</Grid>
							</PageLink>
						</Grid>
					</Grid>
				) : (
					<Grid>
						<Text medium align="center"></Text>
					</Grid>
				)}
			</Grid>
		</Grid>
	)
}

export default VerifiedAccount
