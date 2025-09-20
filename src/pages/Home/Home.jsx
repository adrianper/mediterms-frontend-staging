import { useState, useEffect, useTransition, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

import { routes } from "routing/routes"

import { useMessageBoxContext } from "hooks"

import { Grid, Text, Loading } from "components"

import "./home.scss"
import RankingNotice from "../../app_components/RankingNotice"

const Home = () => {
	const [topics, setTopics] = useState([])
	const [isPending, startTransition] = useTransition()
	const { showMB } = useMessageBoxContext()
	const [showRankingNotice, setShowRankingNotice] = useState(false)

	const navigate = useNavigate()

	const getTopics = useCallback(async () => {
		try {
			const response = await axios.get(`/topics/`)
			if (response.data) {
				setTopics(response.data)
			}
		} catch (error) {
			console.error("GET_TOPICS_ERROR", error)
		}
	}, [])

	const validateUserRanking = useCallback(async () => {
		try {
			const response = await axios.get("ranking/my-ranking")

			const currentUserRanking = response.data?.ranking

			const rankingNoticeLastShown = localStorage.getItem("rankingNoticeLastShown")
			const now = new Date()
			const twoMinutes = 1000 * 60 * 1
			// const oneDay = 1000 * 60 * 60 * 24

			if (!currentUserRanking) return

			if (!rankingNoticeLastShown || now - parseInt(rankingNoticeLastShown) > twoMinutes) {
				setShowRankingNotice(true)
				localStorage.setItem("rankingNoticeLastShown", Date.now().toString())
			}
		} catch (error) {
			console.error(error)
		}
	}, [])

	useEffect(() => {
		startTransition(async () => {
			try {
				const response = await axios.get("session/")

				if (response.data.accountStatus === "MDT-AS-US_PR_0000") {
					localStorage.setItem("md_ac_u_s", response.data.accountStatus)
					navigate("/payment")
					return
				}
				if (response.data.missingEducationalBackground) {
					showMB(
						"Tu perfil está incompleto",
						"Por favor completa la información.",
						"Continuar",
						() => navigate(routes.account.path)
					)
					return
				}

				getTopics()
			} catch (error) {
				console.error("VALIDATE_SESSION_ERROR", error)
			}
		})
	}, [])

	useEffect(() => {
		validateUserRanking()
	}, [])

	const priority = { Principiante: 3, Intermedio: 2, Avanzado: 1 }
	const sortedTopics = topics.sort((a, b) => priority[b.level] - priority[a.level])

	return (
		<Grid className="home_page" itemsX="center" padding="1.14em 0.42em">
			{isPending ? (
				<Loading isLoading />
			) : (
				<Grid w100 gap="1.7em" padding="1.7em 1.85em" className="home_page__list">
					<Text bold size="5" align="center">
						¿Qué quieres estudiar?
					</Text>
					<Text bold color="first" onClick={() => navigate(`/terms`)} className="section_card all_terms">
						Todos los terminos
					</Text>
					<Grid gap="0.7em">
						{sortedTopics.map((topic, key) => (
							<Grid
								onClick={() => {
									navigate(`/terms/${topic.id}`)
								}}
								key={key}
								className="section_card">
								<Text bold>{topic.name}</Text>
								<Text medium>{topic.level}</Text>
							</Grid>
						))}
					</Grid>
				</Grid>
			)}
			{showRankingNotice &&
				<RankingNotice
					isWelcomeNotcie
					onClose={() => setShowRankingNotice(false)}
				/>
			}
		</Grid>
	)
}

export default Home
