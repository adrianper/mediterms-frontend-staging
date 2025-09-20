import { useCallback, useEffect, useState } from "react"
import { Grid } from "components"

import "./account.scss"
import axios from "axios"

import AccountProfileInfo from "./AccountProfileInfo/AccountProfileInfo"
import AccountAnswers from "./AccountAnswers/AccountAnswers"

const Account = () => {
	const [topicWithTotal, setTopicsWithTotal] = useState([])
	const [ranking, setRanking] = useState("-")
	const [accountPage, setAccountPage] = useState(1)

	const getScores = useCallback(async () => {
		axios
			.get("/scores/", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				setTopicsWithTotal(res.data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	const getRanking = useCallback(async () => {
		try {
			const response = await axios.get("ranking/my-ranking")
			if (response.data)
				setRanking(response.data.ranking)
		} catch (error) {
			console.error(error)
		}
	}, [])

	useEffect(() => {
		getScores()
		getRanking()
	}, [])

	return (
		<Grid className="account" itemsX="center" gap="0.7em" padding="1.14em 0.42em">
			{accountPage === 1 &&
				<AccountProfileInfo topicWithTotal={topicWithTotal} ranking={ranking} setAccountPage={setAccountPage} />
			}
			{accountPage === 2 &&
				<AccountAnswers topicWithTotal={topicWithTotal} setAccountPage={setAccountPage} />
			}
		</Grid>
	)
}

export default Account
