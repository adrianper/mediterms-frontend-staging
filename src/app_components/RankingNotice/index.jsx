import { Link as PageLink } from "react-router-dom"

import { Button, Flex, Grid } from "components"

import { routes } from "routing/routes"

import "./RankingNotice.scss"
import { useSelector } from "react-redux"
import Top5Content from "./Top5Content"
import InBetweenContent from "./InBetweenContent"

const RankingNotice = ({
    isWelcomeNotcie = false,
    onClose
}) => {

    const authUser = useSelector(({ auth: { user } }) => user)

    return (
        <Grid className="ranking_notice" contentX="center" contentY="space-between" gap="1em" padding="4em 1.5em">
            {localStorage.getItem("localUserRanking") <= 5 ?
                <Top5Content authUser={authUser} />
                :
                <InBetweenContent authUser={authUser} />
            }

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