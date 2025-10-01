import { useEffect, useState } from "react"

import { Grid } from "components"

import axios from "axios"

import RankingUserCard from "../../pages/Ranking/RankingUserCard"
import UserInstitutionData from "./UserInsitutionData"

const InBetweenContent = ({ authUser }) => {
    const [aboveUser, setAboveUser] = useState(null)
    const [middleUser, setMiddleUser] = useState(null)
    const [belowUser, setBelowUser] = useState(null)

    const getRankingUsers = async () => {
        try {
            const response = await axios.get("/ranking/inbetween-ranking")

            if (response.data) {
                const localUserRanking = localStorage.getItem("localUserRanking")
                const rankingUsers = response.data.rankings.sort(({ ranking: rankA }, { ranking: rankB }) => rankA.toString().localeCompare(rankB.toString()))
                const currentUserIndex = rankingUsers.findIndex(({ userName }) => userName === authUser.name)
                const currentUser = rankingUsers[currentUserIndex]

                if (!localUserRanking || currentUser.ranking == localUserRanking) {
                    currentUser.rankingChange = ""
                } else {
                    currentUser.rankingChange = currentUser.ranking < localUserRanking ? "up" : "down"
                }

                setAboveUser(rankingUsers[currentUserIndex - 1] || null)
                setMiddleUser(currentUser)
                setBelowUser(rankingUsers[currentUserIndex + 1] || null)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getRankingUsers()
    }, [])

    return (
        <>
            <UserInstitutionData campusName={middleUser?.campusName} institutionName={middleUser?.institutionName} />

            <Grid className="ranking_notice_user_cards" gap="0.4em">
                {aboveUser && <RankingUserCard {...aboveUser} className="ranking_user_card__above" />}

                <RankingUserCard {...middleUser} className="ranking_user_card__middle" />

                {belowUser ?
                    <RankingUserCard {...belowUser} className="ranking_user_card__below" /> :
                    <RankingUserCard className="ranking_user_card__hidden" />
                }
            </Grid>
        </>
    )
}

export default InBetweenContent;