
import { Grid, Text } from "components"
import TermsManagement from "./TermsManagement"
import CareerManagement from "./CareerManagement"
import InstitutionManagement from "./InstitutionsManagement"

const AdminHome = () => {
    return (
        <Grid h100 style={{ backgroundColor: "white",  padding: "1rem"}}>
            <Text>Admin Home</Text>
            <InstitutionManagement />
        </Grid>
    )
}

export default AdminHome