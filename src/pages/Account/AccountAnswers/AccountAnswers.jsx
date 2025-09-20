import { Button, Grid, Text } from "components"

const AccountAnswers = ({ topicWithTotal, setAccountPage }) => {

    return (
        <Grid w100 gap="2rem">
            <Grid w100 gap="1.14em" padding="1.71em 1.14em" className="account__user_points">
                <Text bold>Términos respondidos correctamente:</Text>
                {topicWithTotal.map((topic) => (
                    <Grid key={topic.id} columns="2fr 1fr" gap="1.14em 3.78em">
                        <Text
                            style={{ alignSelf: "center" }}
                            medium
                            className={`${topic.topic_name === "Total" ? "account__total_bold" : ""}`}>
                            {topic.topic_name === "Total" ? topic.topic_name.toUpperCase() : topic.topic_name}:
                        </Text>
                        <Text bold color="first" size="6">
                            {topic.total}
                        </Text>
                    </Grid>
                ))}
            </Grid>
            <Button justifySelf="center" onClick={() => setAccountPage(1)}>
                Cerrar
            </Button>
        </Grid>
    )
}

export default AccountAnswers