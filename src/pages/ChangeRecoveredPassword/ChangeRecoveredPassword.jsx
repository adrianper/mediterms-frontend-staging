import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { Button, Grid, TextField, Text } from "components"
import "./change_recovered_password.scss"

const ChangeRecoveredPassword = () => {
	const [formData, setFormData] = useState({ newPassword: "", confirmedPassword: "" })
	const [error, setError] = useState("")
	const [tokenPassword, setTokenPassword] = useState("")
	const [successfulChange, setSuccessfulChange] = useState(false)
	const navigate = useNavigate()
	const handleChange = useCallback((value, name) => {
		setFormData((formData) => ({ ...formData, [name]: value }))
	}, [])

	const handleSumbit = () => {
		let valid = false
		if (
			formData.newPassword != "" &&
			formData.confirmedPassword != "" &&
			formData.newPassword === formData.confirmedPassword
		) {
			valid = true
		}
		if (valid) {
			console.log("entra al valid")
			const options = {
				url: "/user/save_password",
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					...formData,
					tokenPassword: tokenPassword,
				},
			}
			axios(options)
				.then(() => {
					setSuccessfulChange(true)
					setTimeout(function () {
						navigate("/login")
					}, 2000)
				})
				.catch((err) => {
					setError(err.response.data.errors[0])
				})
		} else {
			if (formData.newPassword == "" && formData.confirmedPassword == "") {
				setError("Hay campos vacios")
			}
			if (formData.newPassword != formData.confirmedPassword) {
				setError("Las contraseñas no coinciden")
			}
		}
	}

	useEffect(() => {
		const url = new URL(window.location.href)
		setTokenPassword(url.hash.split("=").pop())
	}, [])

	return (
		<Grid itemsX="center" gap="4.28em" padding="1.42em 0.42em 0em 0.42em" className="change_recovered_password">
			{successfulChange ? (
				<Grid w100 padding="1.72em 1.1em" className="change_recovered_password__form" gap="1.3em">
					<Text align="center">La contraseña fue cambiada con éxito</Text>
				</Grid>
			) : (
				<form
					onSubmit={(e) => {
						handleSumbit()
						e.preventDefault()
					}}>
					<Grid w100 padding="1.72em 1.1em" className="change_recovered_password__form" gap="1.3em">
						<Text size="5" align="center" bold>
							Cambiar contraseña
						</Text>
						<TextField
							label="Nueva contraseña"
							type="password"
							value={formData.newPassword}
							onChange={(v) => handleChange(v, "newPassword")}
						/>
						<TextField
							label="Confirmar contraseña"
							type="password"
							value={formData.confirmedPassword}
							onChange={(v) => handleChange(v, "confirmedPassword")}
						/>
						<Text size="2" color="error" align="center">
							{error}
						</Text>
						<Button type="submit" selfCenter>
							Cambiar
						</Button>
					</Grid>
				</form>
			)}
		</Grid>
	)
}

export default ChangeRecoveredPassword
