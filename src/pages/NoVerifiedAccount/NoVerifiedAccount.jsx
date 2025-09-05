import { useState } from "react"
import axios from "axios"

import { Button, Grid, Text } from "components"
import "./no_verified_account.scss"

const NoVerifiedAccount = () => {
	const [resendText, showResendText] = useState(false)
	const logOut = () => {
		window.clearSession()
		document.location.reload()
	}

	const resendVerificationEmail = () => {
		axios
			.post("/user/resend_email", {
				email: JSON.parse(localStorage.getItem("user")).email,
			})
			.then(function () {
				showResendText(true)
			})
			.catch(function () {})
	}

	return (
		<Grid w100 className="no_verified_account" padding="1.71em 0.62em">
			<Grid w100 padding="2.85em 1.1em" gap="1.71em" className="no_verified_account__container">
				<Text medium align="center">
					Revisa tu bandeja de entrada en tu correo electrónico para terminar el proceso de apertura de cuenta
				</Text>
				<Grid gap="1.14em">
					<Button onClick={() => logOut()} selfCenter>
						Entendido
					</Button>
					<Grid>
						<Button onClick={() => resendVerificationEmail()} className="send_email_button" selfCenter>
							Reenviar correo
						</Button>
					</Grid>
					{resendText && (
						<Text color="first" align="center">
							Hemos enviado de nuevo el correo electrónico de verificación, revisa tu bandeja de entrada y
							la bandeja de correo no deseado
						</Text>
					)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default NoVerifiedAccount
