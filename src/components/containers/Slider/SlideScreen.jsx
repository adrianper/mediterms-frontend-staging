
import Grid from "components"

const SliderScreen = (props) => {
    const {
        children,
        currentScreen,
        screenIdx,
    } = props

    const elementClassName = `slider__screen${currentScreen === screenIdx ? " open" : ""}`

    /*---------------------------------------RENDER----------------------------------------*/
    return (
        <Grid className={elementClassName} style={{ left: `-${currentScreen * 100}%` }}>
            {children}
        </Grid>
    )
}

export default SliderScreen
