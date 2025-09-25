
import { useEffect, useState } from "react"
import axios from "axios"
import { Link as PageLink } from "react-router-dom"

import { ComboBox, Button, Flex, Grid } from "components"
import RankingUserCard from "./RankingUserCard"

import { routes } from "routing/routes"

import "./Ranking.scss"
import { useEducationalBackgroundOptions } from "@app_hooks"

const Ranking = () => {
    const [currentOffset, setCurrentOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [rankingUsers, seRankingUsers] = useState([])

    const [formData, setFormData] = useState({
        stateId: "",
        cityId: "",
        educationalInstitutionId: "",
        programId: "",
    })

    const { stateOptions, cityOptions, institutionOptions, programOptions } = useEducationalBackgroundOptions(formData)

    const handleChange = (name, value) => {
        setFormData(prevState => {
            const result = { ...prevState, [name]: value }
            switch (name) {
                case "stateId":
                    result.cityId = ""
                    result.educationalInstitutionId = ""
                    result.institutionName = ""
                    result.programId = ""
                    result.programName = ""
                    break
                case "cityId":
                    result.educationalInstitutionId = ""
                    result.institutionName = ""
                    result.programId = ""
                    result.programName = ""
                    break
                case "educationalInstitutionId":
                    result.programId = ""
                    result.programName = ""
                    break
            }
            return result
        })
    }

    const getRankingUsers = async (offset = 0) => {
        try {
            setIsLoading(true)

            const { stateId, cityId, educationalInstitutionId: institutionId, programId: campusId } = formData

            const response = await axios.get("/ranking/top-ranking", {
                params: {
                    limit: 10,
                    offset,
                    stateId,
                    cityId,
                    institutionId,
                    campusId,
                }
            })

            if (response.data) {
                const { rankings: nextRankingUsers } = response.data

                if (offset === 0)
                    seRankingUsers(nextRankingUsers)
                else
                    seRankingUsers(currRankingUsers => [...currRankingUsers, ...nextRankingUsers])

                setCurrentOffset(offset + 10)

                if (nextRankingUsers.length < 10)
                    setHasMore(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClickSeeMore = () => {
        getRankingUsers(currentOffset)
    }

    useEffect(() => {
        getRankingUsers()
    }, [formData.stateId, formData.cityId, formData.educationalInstitutionId, formData.programId])

    return (
        <Grid w100 padding="1.14em 0.42em">
            <Grid className="ranking_container" padding="1.7em 1.85em" gap="2rem" itemsX="center">
                <Grid w100 className="ranking_filters_container" gap="1rem">
                    <ComboBox
                        nullValue
                        placeholder="Todos los estados"
                        options={stateOptions}
                        value={formData.stateId} onChange={v => handleChange("stateId", v)} />
                    <ComboBox
                        nullValue
                        placeholder="Todas las ciudades"
                        options={cityOptions}
                        value={formData.cityId} onChange={v => handleChange("cityId", v)} />
                    <ComboBox
                        nullValue
                        placeholder="Todas las instituciones"
                        options={institutionOptions}
                        value={formData.educationalInstitutionId} onChange={v => handleChange("educationalInstitutionId", v)} />
                    <ComboBox
                        nullValue
                        placeholder="Todos los planteles"
                        options={programOptions}
                        value={formData.programId} onChange={v => handleChange("programId", v)} />
                </Grid>
            </Grid>

            <Grid w100 className="ranking_users_container" gap="0.5rem">
                {rankingUsers.map((user, idx) => <RankingUserCard key={idx} {...user} />)}
            </Grid>

            <Flex justify="center" gap="1rem" style={{ marginTop: "2rem" }}>
                {hasMore &&
                    <Button justifySelf="center" variant="secondary" onClick={handleClickSeeMore} disabled={isLoading}>
                        Ver más
                    </Button>
                }
                <PageLink to={routes.account.path} style={{ justifySelf: "center" }}>
                    <Button >Cerrar</Button>
                </PageLink >
            </Flex>
        </Grid>
    )
}

export default Ranking