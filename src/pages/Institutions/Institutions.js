import React, { useCallback,/* useEffect,*/ useState } from 'react'
import { /*useNavigate,*/ Link as PageLink,/* useLocation*/ } from 'react-router-dom'
import axios from 'axios';

import { Button, Grid, Text } from 'components'
import { routes } from 'routing/routes'
import './institutions.scss'

const Institutions = () =>{

    return(
        <Grid w100 className="institutions" padding="1.71em 0.62em">
            <Grid w100 padding="1.71em 1.1em" gap="1.71em" className="institutions__container" >
                <Text bold size="5" align="center">Instituciones que ofrecen descuento a sus alumnos</Text>
                <Text style={{textDecoration: 'underline'}} align="center" color="first">¿No encuentras a tu institución? <br/>Contactanos</Text>
                <Grid columns="auto auto" gap="1.16em">
                    <Grid className="institutions__container__image">
                        <img src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/UACJ.png" />
                    </Grid>
                    <Grid className="institutions__container__image">
                        <img src="https://magiei-resources.s3.us-east-2.amazonaws.com/Icons/UACH.png" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Institutions
