import { useCallback, useState } from "react"
import axios from "axios"

import { useNavigate, Link as PageLink } from "react-router-dom"
import { useDispatch } from "react-redux"

import { useEducationalBackgroundOptions } from "@app_hooks"
import { ComboBox, Button, Grid, TextField, Text } from "components"

import { routes } from "routing/routes"

import { login } from "reduxStore/reducers/auth/authSlice"

import { emailRegExp } from "./UserSignup.utils"
import "./user_signup.scss"

const UserSignup = () => {
	const [formData, setFormData] = useState({
		name: "",
		password: "",
		email: "",
		stateId: "",
		cityId: "",
		educationalInstitutionId: "",
		institutionName: "",
		programId: "",
		programName: "",
		careerId: "",
	})

	const [showError, setShowError] = useState(false)
	const [error, setError] = useState("")

	const {
		stateOptions, cityOptions, institutionOptions, programOptions, careerOptions,
	} = useEducationalBackgroundOptions(formData)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleChange = useCallback((value, name) => {
		setFormData(prevState => {
			const result = { ...prevState, [name]: value }
			switch (name) {
				case "stateId":
					result.cityId = ""
					result.educationalInstitutionId = ""
					result.institutionName = ""
					result.programId = ""
					result.programName = ""
					break
				case "cityId":
					result.educationalInstitutionId = ""
					result.institutionName = ""
					result.programId = ""
					result.programName = ""
					break
				case "educationalInstitutionId":
					result.programId = ""
					result.programName = ""
					break
			}
			return result
		})
	}, [])

	const signUp = async () => {
		const { name, password, email, stateId, cityId, educationalInstitutionId, institutionName, programId, programName, careerId } = formData

		const educationalBackground = {
			educationalInstitutionId,
			programId,
			institutionName,
			programName
		}

		if (educationalInstitutionId === "0")
			delete educationalBackground.educationalInstitutionId
		else
			delete educationalBackground.institutionName
		if (programId === "0")
			delete educationalBackground.programId
		else
			delete educationalBackground.programName

		await axios
			.post("/user/signup", {
				name,
				email,
				password,
				stateId,
				cityId,
				careerId,
				educationalBackground,
			})
			.then(() => {
				dispatch(login({ email, password }))
				navigate("/noVerifiedAccount")
			})
			.catch((err) => {
				if (err) setError("El correo esta en uso")
				setShowError(true)
			})
	}

	const handleSumbit = async (e) => {
		e.preventDefault()

		const { name, password, email, stateId, cityId, educationalInstitutionId, institutionName, programId, programName, careerId } = formData

		if (
			name === "" ||
			password === "" ||
			email === "" ||
			!email.match(emailRegExp) ||
			stateId === "" ||
			cityId === "" ||
			educationalInstitutionId === "" ||
			(educationalInstitutionId === "0" && institutionName === "") ||
			programId === "" ||
			(programId === "0" && programName === "") ||
			careerId === ""
		) {
			setError("Hay campos vacios o inválidos")
			setShowError(true)
			return
		}

		signUp()
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
						label="Nombre completo" value={formData.name} onChange={(v) => handleChange(v, "name")}
					/>

					<TextField
						label="Correo electrónico" type="email" value={formData.email} onChange={(v) => handleChange(v, "email")}
					/>

					<TextField
						label="Contraseña" type="password" value={formData.password} onChange={(v) => handleChange(v, "password")}
					/>

					<ComboBox
						label="Estado" options={stateOptions} value={formData.stateId} onChange={v => handleChange(v, "stateId")}
					/>

					<ComboBox
						label="Ciudad" options={cityOptions} value={formData.cityId} onChange={v => handleChange(v, "cityId")}
					/>

					<ComboBox
						label="Institucion" options={institutionOptions} value={formData.educationalInstitutionId} onChange={v => handleChange(v, "educationalInstitutionId")}
					/>
					{formData.educationalInstitutionId === "0" &&
						<TextField
							label="Nombre de la institucion" value={formData.institutionName} onChange={(v) => handleChange(v, "institutionName")}
						/>
					}

					<ComboBox
						label="Programa" options={programOptions} value={formData.programId} onChange={v => handleChange(v, "programId")}
					/>
					{formData.programId === "0" &&

						<TextField
							label="Nombre del programa" value={formData.programName} onChange={(v) => handleChange(v, "programName")}
						/>
					}

					<ComboBox
						label="Carrera" options={careerOptions} value={formData.careerId} onChange={v => handleChange(v, "careerId")}
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
