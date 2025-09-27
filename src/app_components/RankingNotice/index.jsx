import { Link as PageLink } from "react-router-dom"

import { Button, Flex, Grid, Text } from "components"

import { routes } from "routing/routes"
import { useEffect, useState } from "react"
import axios from "axios"

import "./RankingNotice.scss"
import { useSelector } from "react-redux"
import RankingUserCard from "../../pages/Ranking/RankingUserCard"

const RankingNotice = ({
    isWelcomeNotcie = false,
    onClose
}) => {
    const authUser = useSelector(({ auth: { user } }) => user)

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
                    currentUser.rankingChange
                } else {
                    currentUser.rankingChange = currentUser.ranking < localUserRanking ? "up" : "down"
                }
                
                if (currentUser.ranking !== localUserRanking)
                    localStorage.setItem("localUserRanking", currentUser.ranking)

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
        <Grid className="ranking_notice" contentX="center" contentY="space-between" gap="1em" padding="4em 1.5em">
            <Grid>
                <Text regular color="white" size="8">Tu ranking en</Text>
                <Text color="white" size="8">{middleUser?.institutionName} -</Text>
                <Text color="white" size="8">{middleUser?.campusName}</Text>
            </Grid>
            <Grid className="ranking_notice_user_cards" gap="0.4em">
                {aboveUser && <RankingUserCard {...aboveUser} className="ranking_user_card__above" />}

                <RankingUserCard {...middleUser} className="ranking_user_card__middle" />

                {belowUser ?
                    <RankingUserCard {...belowUser} className="ranking_user_card__below" /> :
                    <RankingUserCard className="ranking_user_card__hidden" />
                }
            </Grid>

            {isWelcomeNotcie ?
                <Flex justify="center" gap="1em">
                    <PageLink to={routes.ranking.path}>
                        <Button variant="secondary">Ver ranking completo</Button>
                    </PageLink>
                    <Button onClick={onClose}>Aprender</Button>
                </Flex>
                :
                <Button onClick={onClose}>Cerrar</Button>
            }
        </Grid>
    )
}

export default RankingNotice