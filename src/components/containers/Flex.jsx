import { memo, useMemo } from 'react'
import reactFastCompare from 'react-fast-compare'

const Flex = ({
    children, className, style, padding, margin, direction,
    align, justify, wrap, w100, h100, gap, ref,
    ...rest
}) => {

    const elementStyle = useMemo(() => ({
        display: 'flex',
        padding,
        margin,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap && 'wrap',
        width: w100 && '100%',
        height: h100 && '100%',
        gap,
        ...style
    }), [padding, margin, direction, align, justify, wrap, w100, h100, style])

    const elementClassNames = useMemo(() => {
        let result = "flex"

        if (className)
            result += ` ${className}`

        return result
    }, [className])

    return (
        <div ref={ref} className={elementClassNames} style={elementStyle}{...rest}>
            {children}
        </div>
    )
}

export default memo(Flex, reactFastCompare)