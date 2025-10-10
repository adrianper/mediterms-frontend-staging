import { Flex, Grid, Text } from "components"
import { useMemo } from "react"
import { FaCaretDown, FaCaretUp, FaCrown } from "react-icons/fa"
import { DEFAULT_PROFILE_PHOTO } from "../../Account/AccountProfileInfo/AccountProfileInfo.utils"

import "./RankingUserCard.scss"

const RankingUserCard = ({
    ranking, photoUrl, userName, institutionName, careerName, campusName, stateName, cityName, score, rankingChange, className = ""
}) => {

    const rankingChangeContent = useMemo(() => {
        if (rankingChange === "up")
            return <FaCaretUp size="2rem" color="rgb(var(--color--green--1))" />

        if (rankingChange === "down")
            return <FaCaretDown size="2rem" color="var(--text-color--error-alter)" />

        return <>&nbsp;</>
    }, [rankingChange])

    return (
        <Grid columns="auto 1fr auto" itemsY="center" className={`ranking_user_card ${className}`} padding="1.2em 1.5em 1.2em 0">
            <Grid className="card_placement_container" itemsY="center">
                {rankingChangeContent}
                <Text className="user_placement">{ranking}</Text>
            </Grid>
            <Flex className="card_user_info" align="center">
                <Grid className="user_picture">
                    <img src={photoUrl || DEFAULT_PROFILE_PHOTO} />
                    {ranking === 1 &&
                        <FaCrown size="40" className="crown_icon" />
                    }
                </Grid>
                <Grid>
                    <Text bold size="4" className="user_name">{userName}</Text>
                    <Text className="user_career">{careerName}</Text>
                    <Text className="user_campus">{campusName}</Text>
                    <Text className="user_institution">{institutionName}</Text>
                    <Text className="user_location">{cityName}, {stateName}</Text>
                </Grid>
            </Flex>
            <Grid gap="0.3em">
                <Text bold>Puntos</Text>
                <Text bold align="center" className="user_points">{score}</Text>
            </Grid>
        </Grid>
    )
}

export default RankingUserCard