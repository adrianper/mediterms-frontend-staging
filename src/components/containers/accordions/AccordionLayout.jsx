import React, { cloneElement, isValidElement, memo } from 'react'
import reactFastCompare from 'react-fast-compare'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { AnimationPlayer } from 'components'

const AccordionLayout = (props) => {
    const {
        children,
        className,
        contentRef,
        contentStyles,
        isOpen,
        title,
        toggleAccordion,
        toggleElement,
    } = props

    return (
        <div className={`${className}${isOpen ? ' open' : ''}`}>
            {isValidElement(toggleElement) ?
                cloneElement(toggleElement, { onClick: toggleAccordion })
                :
                <div className='accordion_title' onClick={toggleAccordion}>
                    <p className='accordion_title__text'>{title}</p>
                    <div className='title__arrow'>
                        <AnimationPlayer hover animation={isOpen ? 'upDown' : 'downUp'} >
                            <MdKeyboardArrowDown size="2em" />
                        </AnimationPlayer>
                    </div>
                </div>
            }
            <div style={contentStyles} className='accordion__content_container' >
                <div ref={contentRef} className='accordion__content' >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default memo(AccordionLayout, reactFastCompare)
