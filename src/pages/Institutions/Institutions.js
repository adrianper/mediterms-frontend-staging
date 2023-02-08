import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { useNavigate, Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import axios from 'axios';

import { Button, Grid, Text, TextField } from 'components'
import { routes } from 'routing/routes'
import './institutions.scss'

const Institutions = () =>{

    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ institutionName: '', contactName: '', email: '', phoneNumber: '', positionAndDepartment: '' })
    const [successfulRequest, setSuccessfulRequest] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = useCallback((value, name) => {
        setFormData(formData => ({ ...formData, [name]: value }))
    }, [])

    const handleSumbit = () =>{
        let valid = false
        console.log("entra")
        if (formData.institutionName != '' && formData.contactName != '' && formData.email != '' && formData.phoneNumber != '' && formData.positionAndDepartment != ''){
            valid = true
        }

        if(valid){
            const options = {
                url: '/prospects/save',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
                data: {
                  ...formData,
                }
            }
            axios(options)
            .then(response => {
                setSuccessfulRequest(true)
            })
            .catch(err =>{
                setError(err.response.data.errors[0])
            })
        }else{
            setError('Hay campos vacios')
        }
    }

    const setShowInstituteMessagge = (name, value) =>{

    }

    const cleanInstitutes = () =>{
        setShowForm(false)
        setFormData({institutionName: '', contactName: '', email: '', phoneNumber: '', positionAndDepartment: ''})
        setSuccessfulRequest(false)
        setError('')
    }

    return(
        <Grid w100 className="institutions" padding="1.71em 0.62em">
            <Grid w100 padding="1.71em 1.142em" className="institutions__container" >
                {showForm ?
                    <Grid>
                        {successfulRequest ?
                            <Grid gap="1.71em">
                                <Text>Hemos recibido tu solicitud. <br/><br/> En breve nos pondremos en contacto contigo vía correo electrónico para darte instrucciones de como obtener el descuento para tus estudiantes y que puedan empezar a usar MediTerms®.</Text>
                                <Button selfCenter onClick={() => {cleanInstitutes()}}>Entendido</Button>
                            </Grid>
                        :
                        <Grid gap="2.8em">
                            <Grid gap="1.14em">
                                <Text bold align="center" size="5">Alumnos</Text>
                                <Text>Para habilitar el descuento institucional a los alumnos, 
                                    es necesario que se ponga en contacto con nosotros una de las autoridades educativas<br/><br/>
                                    Acércate a la dirección de tu carrera y muestrales la información que aparece a continuación:
                                </Text>
                            </Grid>
                            <Grid gap="1.14em">
                                <Text bold align="center" size="5">Autoridades educativas</Text>
                                <Text>Para habilitar el descuento institucional a los alumnos, es necesario que se ponga en contacto con nosotros a través del siguiente formulario.</Text>
                                <Grid gap="1.21em">
                                    <TextField
                                        value={formData.institutionName}
                                        label="Nombre de la institución"
                                        onChange={v => handleChange(v, 'institutionName')}
                                    />
                                    <TextField
                                        value={formData.contactName}
                                        label="Nombre del contacto"
                                        onChange={v => handleChange(v, 'contactName')}
                                    />
                                    <TextField
                                        value={formData.positionAndDepartment}
                                        label="Puesto y depto del contacto"
                                        onChange={v => handleChange(v, 'positionAndDepartment')}
                                    />
                                    <TextField
                                        value={formData.email}
                                        label="Correo electrónico"
                                        onChange={v => handleChange(v, 'email')}
                                    />
                                    <TextField
                                        value={formData.phoneNumber}
                                        label="Teléfono"
                                        onChange={v => handleChange(v, 'phoneNumber')}
                                    />
                                    {error !=='' && <Text medium align="center" color="error">{error}</Text>}
                                    <Grid style={{marginTop:'10px'}} contentX="center" columns="auto auto" gap="1.71em">
                                        <Button className="second_button" onClick={() => {cleanInstitutes()}}>Regresar</Button>
                                        <Button width="108px" onClick={handleSumbit}>Enviar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        }
                    </Grid>
                :
                    <Grid gap="1.71em">
                        <Text bold size="5" align="center">Instituciones que ofrecen descuento a sus alumnos</Text>
                        <Text onClick={() => {setShowForm(true)}} style={{textDecoration: 'underline'}} align="center" color="first">¿No encuentras a tu institución? <br/>Contactanos</Text>
                        {/*
                        <Grid columns="auto auto" gap="1.16em">
                            <Grid onClick={() => {setShowInstituteMessagge("UNIVERSIDAD AUTÓNOMA DE CIUDAD JUÁREZ",true)}} className="institutions__container__image">
                                <img src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/UACJ.png" />
                            </Grid>
                            <Grid onClick={() => {setShowInstituteMessagge("UNIVERSIDAD AUTÓNOMA DE CIUDAD CHIHUAHUA",true)}} className="institutions__container__image">
                                <img src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/UACH.png" />
                            </Grid>
                        </Grid>
                        */}
                        <Button onClick={() => {navigate('/signup')}} selfCenter className="second_button">Regresar</Button>
                    </Grid>
                }
                
            </Grid>
        </Grid>
    )

}

export default Institutions
