import { useCallback, useState } from "react"
import axios from "axios"

import { useNavigate, Link as PageLink } from "react-router-dom"
import { useDispatch } from "react-redux"

import { Button, Grid, TextField, Text } from "components"
import { routes } from "routing/routes"

import "./user_signup.scss"
import { login } from "reduxStore/reducers/auth/authSlice"

const UserSignup = () => {
	const [formData, setFormData] = useState({ name: "", institution: "", email: "", password: "" })
	const [showError, setShowError] = useState(false)
	const [error, setError] = useState("")

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleChange = useCallback((value, name) => {
		setFormData((formData) => ({ ...formData, [name]: value }))
	}, [])

	const handleSumbit = async (e) => {
		e.preventDefault()
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (
			formData.email === "" ||
			formData.password === "" ||
			formData.name === "" ||
			(formData.institution === "" && formData.email.match(regex))
		) {
			setError("Hay campos vacios o invalidos")
			setShowError(true)
		} else {
			await axios.post("/user/signup", { ...formData }).catch((err) => {
				if (err) setError("El correo esta en uso")
				setShowError(true)
			})
			dispatch(login({ email: formData.email, password: formData.password }))
			navigate("/noVerifiedAccount")
		}
	}

	return (
		<Grid className="user_signup" itemsX="center" gap="4.28em" padding="4.28em 0.42em">
			<PageLink to={routes.login.path}>
				<img src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png" />
			</PageLink>
			<form onSubmit={handleSumbit}>
				<Grid w100 padding="1.72em 1.1em" className="user_signup__form" gap="1.3em" maxWidth="22em">
					<Text size="5" align="center" bold>
						Abre una cuenta
					</Text>
					<TextField
						label="Nombre completo"
						value={formData.name}
						onChange={(v) => handleChange(v, "name")}
					/>
					<TextField
						label="Institución educativa"
						value={formData.institution}
						onChange={(v) => handleChange(v, "institution")}
					/>
					<TextField
						label="Correo electrónico"
						type="email"
						value={formData.email}
						onChange={(v) => handleChange(v, "email")}
					/>
					<TextField
						label="Contraseña"
						type="password"
						value={formData.password}
						onChange={(v) => handleChange(v, "password")}
					/>
					{showError && (
						<Text align="center" size="2" color="error">
							{error}
						</Text>
					)}
					<Grid>
						<Text align="center">
							Al hacer click en "Abrir cuenta" aceptas que has revisado y aceptado el
						</Text>
						<PageLink to={routes.privacy.path}>
							<Text bold align="center" className="text--underline" color="first">
								AVISO DE PRIVACIDAD
							</Text>
						</PageLink>
					</Grid>

					<Button type="submit" selfCenter>
						Abrir cuenta
					</Button>

					<PageLink to={routes.login.path}>
						<Text medium align="center" color="first">
							Iniciar sesión
						</Text>
					</PageLink>
				</Grid>
			</form>
		</Grid>
	)
}

export default UserSignup
