import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import reactFastCompare from 'react-fast-compare'

const AnimationPlayer = (props, ref) => {
    const {
        duration,
        children,
        animation,
        hover = false,
    } = props
    
    /*------------------------------------STATE---------------------------------*/
    const [animate, setAnimate] = useState(false)

    /*------------------------------------REF---------------------------------*/
    const containerRef = useRef() //{current: undefined}
    const durationRef = useRef(duration)

    /*------------------------------------FUNCTIONS---------------------------------*/
    const playAnimation = useCallback(() => {
        setAnimate(true)
    }, [setAnimate])

    /*------------------------------------EXTERNAL---------------------------------*/
    useImperativeHandle(ref, () => ({
        play: playAnimation
    }), [playAnimation])

    /*------------------------------------EFFECT---------------------------------*/
    useEffect(() => {
        containerRef.current.style.animationDuration = `${duration}s`
    }, [duration])

    useEffect(() => {
        if(!duration) durationRef.current = 0.6

        if (animate)
            setTimeout(() => {
                containerRef.current.classList.remove(`animation--${animation}`)
                setAnimate(false)
            }, duration*1000 )
    }, [animate, animation, duration])

    /*------------------------------------RENDER---------------------------------*/
    const playerProps = {
        ref: containerRef,
        onMouseEnter: hover ? playAnimation:null,
        className: `animation_player${animate ? ` animation--${animation}` : ''}`
    }

    return (
        <div {...playerProps}>
            {children}
        </div>
    )
}

export default memo(forwardRef(AnimationPlayer), reactFastCompare)
