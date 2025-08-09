import { Link as PageLink } from "react-router-dom"
import axios from "axios"

import { Button, Grid, Text } from "components"
import { routes } from "routing/routes"
import "./final_demo.scss"
import { useEffect } from "react"

const FinalDemo = () => {
	useEffect(() => {
		axios({
			url: "/prospects/counter_test_app",
			method: "POST",
			data: {
				name: "APP_TEST",
			},
		})
	}, [])

	return (
		<Grid w100 className="final_demo" padding="1.71em 0.62em">
			<Grid w100 padding="2.85em 1.1em" gap="1.71em" className="final_demo__container">
				<Text medium align="center">
					Has llegado al final de la demostración.
				</Text>
				<Text medium align="center">
					Abre una cuenta o inicia sesión para continuar
				</Text>
				<Grid gap="1.14em">
					<PageLink to={routes.login.path}>
						<Grid>
							<Button selfCenter>Iniciar sesión</Button>
						</Grid>
					</PageLink>
					<Text medium align="center">
						o
					</Text>
					<PageLink to={routes.userSignup.path}>
						<Grid>
							<Button className="open_account_button" selfCenter>
								Abrir cuenta
							</Button>
						</Grid>
					</PageLink>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default FinalDemo
