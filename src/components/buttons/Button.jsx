import { useMemo } from "react"
import "./button.scss"

const Button = ({
    className = "",
    width = "",
    maxWidth = "",
    alignSelf = "",
    justifySelf = "",
    style = {},
    disabled = false,
    variant,
    children,
    ...rest
}) => {

    style = {
        ...style,
        width,
        maxWidth,
        alignSelf,
        justifySelf,
    }

    const btnClassNames = useMemo(() => {
        let result = "button"

        if (className)
            result += ` ${className}`

        if (disabled)
            result += " disabled"

        if (variant)
            result += ` button--${variant}`

        return result
    }, [className, disabled, variant])

    return (
        <button className={btnClassNames} style={style} {...rest}>
            {children}
        </button>
    )
}

export default Button
