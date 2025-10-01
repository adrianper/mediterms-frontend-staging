import { useEffect, useState } from "react"
import { Capacitor } from "@capacitor/core"
import axios from "axios"
import { useNavigate, Link as PageLink } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { routes } from "routing/routes"

import { Button, Grid, Text, CharacterField, Loading } from "components"

import IOSPaymentDisplay from "pages/IOSPaymentDisplay/IOSPaymentDisplay"
import CheckoutForm from "./CheckoutForm/CheckoutForm"

import "./payment.scss"
import { ENVS } from "../../scripts/generalVariables"

const stripePromise = loadStripe(ENVS.stripePK)

const Payment = () => {
	const [clientSecret, setClientSecret] = useState("")
	const setError = useState("")[1]
	const setShowError = useState(false)[1]
	const [successfulAccount, setSuccessfulAccount] = useState(false)

	const [fullPrice, setFullPrice] = useState(null)
	const [price, setPrice] = useState(null)
	const [promoPrice, setPromoPrice] = useState(null)
	const [promoError, setPromoError] = useState("")
	const [priceToken, setPriceToken] = useState(null)

	const [freeAccount, setFreeAccount] = useState(false)
	const [distance, setDistance] = useState(0)
	const promoCodeLength = 6
	const navigate = useNavigate()

	const handlePromotionalCode = (v) => {
		if (v.length === promoCodeLength) {
			axios
				.post("/payment/promo_code/validate", {
					promoCode: v.join(""),
				})
				.then(function (response) {
					setPromoError("")
					const price = response.data.newPrice
					if (price === 0) setFreeAccount(true)
					else setPromoPrice(price)
					setPriceToken(response.data.priceToken)
				})
				.catch(function (error) {
					setPromoError(error.response.data.errors[0])
				})
		} else {
			setFreeAccount(false)
		}
	}

	useEffect(() => {
		const run = async () => {
			try {
				const response = await axios.get("session/")
				if (response.data.accountStatus !== "MDT-AS-US_PR_0000") {
					localStorage.setItem("md_ac_u_s", response.data.accountStatus)
					navigate("/home")
				}
			} catch (error) {
				console.error("VALIDATE_SESSION_ERROR", error)
			}
		}
		run()
	}, [])

	useEffect(() => {
		const run = async () => {
			try {
				const response = await axios.get("/payment/prices")
				setPrice(response.data.realPrice)
				setFullPrice(response.data.fullPrice)
				setPriceToken(response.data.priceToken)
			} catch (error) {
				console.log("error", error)
			}
		}
		run()
	}, [])

	useEffect(() => {
		if (priceToken !== null) {
			axios
				.post(`/payment/create-payment-intent`, { priceToken })
				.then((res) => {
					setClientSecret(res.data.secret_client)
				})
				.catch(function (error) {
					console.log("error", error)
				})
		}
	}, [priceToken])

	useEffect(() => {
		const countDownDate = new Date()
		countDownDate.setDate(countDownDate.getDate() + 2)
		const x = setInterval(() => {
			const now = new Date().getTime()
			setDistance(countDownDate - now)
		}, 1000)
		return () => clearInterval(x)
	}, [])

	const days = Math.floor(distance / (1000 * 60 * 60 * 24))
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((distance % (1000 * 60)) / 1000)

	if (Capacitor.getPlatform() === "ios") return <IOSPaymentDisplay />

	const options = {
		clientSecret: clientSecret,
		appearance: {
			layout: {
				type: "accordion",
				defaultCollapsed: false,
				radios: true,
				spacedAccordionItems: false,
			},
		},
	}

	return (
		<Grid>
			{successfulAccount ? (
				<Grid className="payment_successfuly" padding="2.28em 1.57em" itemsX="center" gap="2.18em">
					<img
						alt="mediterms logo"
						src="https://inteligeneresources.s3.us-east-2.amazonaws.com/Imagenes/mediterms-logo.png"
					/>
					<Grid w100 padding="2em" className="payment_successfuly__container" gap="2.18em">
						<Text medium align="center">
							¡Tu pago ha sido exitoso, y tu membresía ahora se encuentra activa!
						</Text>
						<Button onClick={() => navigate("/home")} selfCenter>
							Empezar a aprender
						</Button>
					</Grid>
				</Grid>
			) : (
				<Grid className="payment" padding="2.28em 1.57em" itemsX="center" gap="2.18em">
					{price === null ? (
						<Loading isLoading />
					) : (
						<>
							{!freeAccount && (
								<Text bold align="center" size="8" color="first">
									¡Felicidades!
								</Text>
							)}
							{!freeAccount && (
								<Grid gap="1em">
									<Text medium align="center">
										Has aprendido 30 términos médicos
									</Text>
									<Text medium align="center">
										Adquiere una membresía para seguir aprendiendo
									</Text>
								</Grid>
							)}
							<div>
								<Grid w100 className="payment__form" gap="1.61em">
									{!freeAccount && (
										<Grid style={{ gap: "inherit" }}>
											<Grid padding="1.42em" className="payment__price_container">
												<Text>
													Precio regular: <br />
													<span className="payment__regular_price">${fullPrice} USD/6 meses</span>
												</Text>
												<Text medium style={{ margin: "1.4em 0em 0.5em 0em" }}>
													Promoción de inicio de semestre:
												</Text>
												<Text bold size="9">
													{price}
													<span style={{ fontSize: "24px", color: "#162127" }}>USD/6 meses</span>
												</Text>
												<Text bold color="error" size="2">
													Termina en: {days}d {hours}h {minutes}m {seconds}s
												</Text>
											</Grid>
											<Text bold align="center" size="5">
												¿Tienes un código de descuento?
											</Text>
										</Grid>
									)}
									<Grid gap="0.7em" itemsX="center">
										<CharacterField onChange={handlePromotionalCode} length={promoCodeLength} />
										{promoError !== "" && <Text color="error">{promoError}</Text>}
									</Grid>
									{!freeAccount && (
										<PageLink to={routes.institutions.path}>
											<Text
												medium
												style={{ textDecoration: "underline" }}
												align="center"
												color="first">
												Ver instituciones educativas que ofrecen códigos a sus alumnos
											</Text>
										</PageLink>
									)}
									{promoPrice && (
										<Grid padding="1.42em" gap="0.7em" className="payment__promo_container">
											<Text bold color="white" size="4">
												¡Tienes un descuento!
											</Text>
											<Text medium color="white">
												Tu nuevo total es:
											</Text>
											<Text bold color="white" size="9">
												{promoPrice}
												<span style={{ fontSize: "24px" }}>USD/año</span>
											</Text>
										</Grid>
									)}
									{!freeAccount && (
										<Text bold size="5" align="center">
											Selecciona método de pago
										</Text>
									)}

									{freeAccount && (
										<Grid padding="1.42em" gap="0.7em" className="payment__promo_container">
											<Text bold align="center" color="white" size="4">
												¡Tienes una cortesía para abrir tu cuenta gratis!
											</Text>
										</Grid>
									)}
								</Grid>
								{!freeAccount && (
									<Grid>
										<Text align="center" medium style={{ margin: "1.4em 0em 0.5em 0em" }}>
											Pagos procesados por:
										</Text>
										<img
											alt="stripe payment"
											src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/stripe-payment.png"
											className="payment__stripe_logo"
										/>
									</Grid>
								)}
							</div>
							{clientSecret !== "" && (
								<Elements stripe={stripePromise} options={options} key={clientSecret}>
									<CheckoutForm
										setSuccessfulAccount={setSuccessfulAccount}
										setError={setError}
										setShowError={setShowError}
										freeAccount={freeAccount}
										clientSecret={clientSecret}
										priceToken={priceToken}
									/>
								</Elements>
							)}
						</>
					)}
				</Grid>
			)}
		</Grid>
	)
}

export default Payment
