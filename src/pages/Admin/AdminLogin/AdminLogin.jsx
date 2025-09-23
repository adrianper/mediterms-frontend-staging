
import { Grid, Text } from "components"

import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { Button, TextField } from "components"
import { routes } from "routing/routes"

import "./login.scss"
import { login } from "reduxStore/reducers/auth/authSlice"

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = useCallback((value, name) => {
        setFormData((formData) => ({ ...formData, [name]: value }))
    }, [])

    const handleSumbit = async (e) => {
        e.preventDefault()

        dispatch(login(formData)).then((res) => {
            if (res.error) {
                return
            }
            if (localStorage.getItem("paymentStatus") === "false") {
                navigate(routes.home.path)
            }
            navigate(routes.home.path)
        })
    }

    return (
        <Grid className="login" itemsX="center" gap="4.28em" padding="4.28em 0.42em 0em 0.42em">
            <form onSubmit={handleSumbit}>
                <Grid w100 padding="1.72em 1.1em" className="login__form" gap="1.3em" maxWidth="22em">
                    <Text size="5" align="center" bold>
                        Admin Login
                    </Text>
                    <TextField
                        label="Correo electrónico"
                        type="email"
                        value={formData.email}
                        onChange={(v) => handleChange(v, "email")}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        value={formData.password}
                        onChange={(v) => handleChange(v, "password")}
                    />
                    <Button type="submit" selfCenter>
                        Ingresar
                    </Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default AdminLogin