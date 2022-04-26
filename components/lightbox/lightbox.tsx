import classNames from "classnames"
import { FC, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { CustomImage } from "../custom-image/custom-image"
import styles from './lightbox.module.css'
import Cross from '../../public/assets/svg/cross.svg'

export interface ILightboxProps  {
    setOpen: (bool: boolean) => void,
    content: JSX.Element
}

function Lightbox(props: ILightboxProps): JSX.Element{
    const { content, setOpen } = props
    const [ activeClass, setActiveClass] = useState<'active' | undefined>()
    const portal: HTMLElement | null =  document.getElementById("ng-modal")
     useEffect(() => {
         setActiveClass('active')
     }, [])
    
    if ( portal ) {
        return ReactDOM.createPortal(
            <div className={classNames(styles.container, {[styles[`${activeClass}`]] : activeClass}, 'flex  flex--justify-content-center')}>
                <div className={styles.shadow}></div>
                <div className={styles.lightbox}>
                    <div className={classNames('flex flex--justify-content-end')} onClick={closeLightbox}>
                        <span className={styles['cross-wrapper']}>
                            <Cross className={classNames(styles['closing-cross'], 'icon-hover')}/>
                        </span>
                    </div>
                    <div className={styles.content}>
                        {content}
                    </div>
                </div>
            </div>, portal
        )
    }

    return (<div>Portal was not found</div>)

    function closeLightbox() {
        setActiveClass(undefined)
        setTimeout(() => setOpen(false), 300)
    }
    
}

export default Lightbox


