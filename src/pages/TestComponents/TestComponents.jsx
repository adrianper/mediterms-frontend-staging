import React, { Fragment, memo, useCallback, useRef, useState } from 'react'
import reactFastCompare from 'react-fast-compare'

import {
    Accordion, AnimationPlayer, Button, CharacterField, Flex,
    Grid, Loading, MessageBox, RadioButton, TextField, Toggle
} from 'components'

import { IoIosAlarm } from 'react-icons/io'

const TestComponents = () => {
    const [pass, setPass] = useState('')
    const [toggleState, setToggleState] = useState(true)
    const messageBoxRef = useRef()

    const showMb = () => {
        messageBoxRef.current.show({ title: 'Title', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus maiores libero, praesentium dolorum fugiat' })
    }

    const radioHandleChange = useCallback((v) => {
        console.log(v)
    }, [])

    return (
        <Fragment>
            <Grid w100 h100 centerItems columns='auto 1fr' gap='1em 2em' padding='1em'>
                <p>CharacterField</p>
                <CharacterField length='6' />
                <p>TextField</p>
                <TextField type='password' label='Password' placeholder='Type password' value={pass} onChange={setPass} />
                <p>Animation Player</p>
                <AnimationPlayer hover animation="pulse">
                    <IoIosAlarm color="var(--bg-color--third" size="2em" />
                </AnimationPlayer>
                <p>Loading</p>
                <div style={{ height: '40px', width: '10em' }}>
                    <Loading isLoading={true} />
                </div>
                <p>Flex</p>
                <Flex padding='1em' justify='center' style={{ gap: '15px' }} onClick={e => console.log(e._reactName, ' flex')}>
                    <p>Click</p>
                    <p>Console log</p>
                </Flex>
                <p>Accordion</p>
                <Accordion title='Lorem ipsum'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus maiores libero, praesentium dolorum fugiat, perspiciatis nam ipsum deleniti, ut aliquam hic enim accusantium quisquam quo sit temporibus magni iure. Magnam!
                    </p>
                </Accordion>
                <p>MessageBox</p>
                <Button style={{ justifySelf: 'center' }} onClick={showMb}>Show MB</Button>
                <p>Radio Button</p>
                <RadioButton likert inputs={[-3, -2, -1, 0, 1, 2, 3]} onChange={radioHandleChange} direction='column' />
                <p>Toggle</p>
                <Toggle value={toggleState} onChange={setToggleState} label1="Si" label2="No" />
            </Grid>
            <MessageBox ref={messageBoxRef} />
        </Fragment>
    )
}

export default memo(TestComponents, reactFastCompare)
