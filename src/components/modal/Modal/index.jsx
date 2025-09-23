import { Flex, Grid, Portal } from 'components'

import './modal.scss'

const Modal = (props) => {
    const {
        maxWidth = '50vw',
        maxHeight = '50vh',
        padding = '1rem',
        className = '',
        children,
    } = props

    return (
        <Portal>
            <Flex className='modal' padding='1rem'>
                <Grid w100 padding={padding} className={`modal_content ${className}`} maxWidth={maxWidth} maxHeight={maxHeight}>
                    {children}
                </Grid>
            </Flex>
        </Portal>
    )
}

export default Modal
