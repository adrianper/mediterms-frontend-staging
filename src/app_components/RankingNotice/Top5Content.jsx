
import { Grid } from "components"

import axios from "axios"

import { useAccountInfo } from "@app_hooks"

import UserInstitutionData from "./UserInsitutionData"
import RankingUserCard from "../../pages/Ranking/RankingUserCard"
import { useEffect, useState } from "react"

const Top5Content = ({ authUser }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [rankingUsers, setRankingUsers] = useState([])

    const { getAccountInfo } = useAccountInfo()

    const getRankingUsers = async () => {
        try {

            const accountInfo = await getAccountInfo()

            const {
                stateId,
                cityId,
                educationalBackground: {
                    educationalInstitutionId: institutionId, programId: campusId
                },
            } = accountInfo

            const response = await axios.get("/ranking/top-ranking", {
                params: {
                    limit: 5,
                    offset: 0,
                    stateId,
                    cityId,
                    institutionId,
                    campusId,
                }
            })

            if (response.data) {
                const topRankingUsers = response.data.rankings

                const localUserRanking = localStorage.getItem("localUserRanking")

                const currentUserIndex = topRankingUsers.findIndex(({ userName }) => userName === authUser.name)
                const currentUser = topRankingUsers[currentUserIndex]

                if (!localUserRanking || currentUser.ranking == localUserRanking) {
                    currentUser.rankingChange = ""
                } else {
                    currentUser.rankingChange = currentUser.ranking < localUserRanking ? "up" : "down"
                    localStorage.setItem("localUserRanking", currentUser.ranking)
                }

                setCurrentUser(currentUser)
                setRankingUsers(topRankingUsers)
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
            <UserInstitutionData campusName={currentUser.campusName} institutionName={currentUser.institutionName} />

            <Grid className="ranking_notice_user_cards" gap="0.4em">
                {rankingUsers.map((user, idx) => <RankingUserCard key={idx} {...user} />)}
            </Grid>
        </>
    )
}
export default Top5Content