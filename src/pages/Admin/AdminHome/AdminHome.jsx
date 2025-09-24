
import { Grid, Text } from "components"
import TermsManagement from "./TermsManagement"
import CareerManagement from "./CareerManagement"

const AdminHome = () => {
    return (
        <Grid h100 style={{ backgroundColor: "white",  padding: "1rem"}}>
            <Text>Admin Home</Text>
            <CareerManagement />
        </Grid>
    )
}

export default AdminHome