import { Grid, Text } from "components"

const UserInstitutionData = ({
    institutionName,
    campusName
}) => {
    return (
        <Grid>
            <Text regular color="white" size="8">Tu ranking en</Text>
            <Text color="white" size="8">{institutionName} -</Text>
            <Text color="white" size="8">{campusName}</Text>
        </Grid>
    )
}

export default UserInstitutionData