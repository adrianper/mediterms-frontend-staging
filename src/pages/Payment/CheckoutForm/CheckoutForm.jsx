import { useState } from "react"
import axios from "axios"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button, Text, Loading } from "components"
import { useDispatch } from "react-redux"
import { setAccountStatus } from "reduxStore/reducers/auth/authSlice"

const CheckoutForm = ({ priceToken, clientSecret, setSuccessfulAccount, freeAccount }) => {
	const stripe = useStripe()
	const elements = useElements()

	const [errorMessage, setErrorMessage] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useDispatch()

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!stripe || !elements) return

		setIsLoading(true)
		if (freeAccount) {
			const res = await axios.post(
				"/payment/validate-payment",
				{ client_secret: "", priceToken },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)
			dispatch(setAccountStatus({ accountStatus: res.data.accountStatus }))
			localStorage.setItem("md_ac_u_s", res.data.accountStatus)
			if (res.data.accountStatus === "MDT-AS-US_AP_0000") setSuccessfulAccount(true)
			await axios.post(
				"/user/send_welcome_email",
				{ email: JSON.parse(localStorage.getItem("user")).email },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)
		} else {
			const { error } = await stripe.confirmPayment({
				elements,
				confirmParams: { return_url: "https://www.google.com/" },
				redirect: "if_required",
			})

			if (error) setErrorMessage(error.message)
			else {
				const res = await axios.post(
					"/payment/validate-payment",
					{ client_secret: clientSecret, priceToken },
					{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
				)
				dispatch(setAccountStatus({ accountStatus: res.data.accountStatus }))
				localStorage.setItem("md_ac_u_s", res.data.accountStatus)
				if (res.data.accountStatus === "MDT-AS-US_AP_0000") setSuccessfulAccount(true)
				await axios.post(
					"/user/send_welcome_email",
					{ email: JSON.parse(localStorage.getItem("user")).email },
					{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
				)
			}
		}
		setIsLoading(false)
	}

	return (
		<form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
			{!freeAccount && <PaymentElement options={{ readOnly: isLoading }} />}
			{errorMessage && (
				<Text style={{ marginTop: "1em" }} color="error" align="center">
					{errorMessage}
				</Text>
			)}
			{isLoading ? (
				<Loading isLoading />
			) : (
				<Button style={{ marginTop: "1em" }} type="submit">
					{freeAccount ? "Abrir cuenta" : "Pagar y abrir cuenta"}
				</Button>
			)}
		</form>
	)
}

export default CheckoutForm
