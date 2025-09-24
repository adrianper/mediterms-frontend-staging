import { Children, useMemo } from "react"

import { Flex, Grid } from "components"

import "./Slider.scss"

const Slider = (props) => {
    const { containerProps = {}, currentScreen = 0, className, children } = props

    const elementClassName = useMemo(() => {
        let result = "slider"

        if (className) result += ` ${className}`

        return result
    }, [className])

    /*---------------------------------------RENDER----------------------------------------*/

    return (
        <Flex {...containerProps} className={elementClassName}>
            {Children.map(children, (child, i) => (
                <Grid
                    className={`slider__screen${currentScreen === i ? " open" : ""}`}
                    style={{ left: `-${currentScreen * 100}%` }}
                >
                    {child}
                </Grid>
            ))}
        </Flex>
    )
}

export default Slider
