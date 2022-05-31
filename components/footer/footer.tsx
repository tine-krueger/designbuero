import classNames from "classnames";
import dynamic from "next/dynamic";
import { ComponentProps, FC, memo, useContext, useState } from "react";
import { globalMenuContext } from "../../data/menu-data/menu-context";
import { CustomImage } from "../custom-image/custom-image";
import { Headline } from "../headline/headline";
import { Navigation } from "../navigation/navigation";
import styles from './footer.module.css'
import Envelope from '../../public/assets/svg/email.svg'
import Phone from '../../public/assets/svg/phone-thin.svg'
import { NGColor } from "../../types/colors";
import { Contact } from "../contact/contact";

export interface IFooterProps extends ComponentProps<'footer'> {
    
}

const LightboxComponent = dynamic(() => import('../lightbox/lightbox'));

export const UnmemoizedFooter: FC<IFooterProps> = (props) => {
    const {className,...attributes} = props
    const {globalMenuState, lightbox} = useContext(globalMenuContext)
    const classes = classNames(className, styles.container)
    return (
        <footer className={classes} {...attributes}>
            <div className={classNames(styles['inner-wrapper'], 'grid')}>
                <div className={classNames(styles.copyright, 'flex')}>
                    <CustomImage className={styles.logo} src={'/assets/svg/Logo_desingbuero.svg'}/>
                    <p className={classNames('c-t--white font-style--xs')}>© 2022</p>
                </div>
                <Navigation 
                    className={classNames(styles['legal-nav'], 'font-style--xs')}
                    childElementsClasses={{listItem: styles['legal-nav-item']}}  
                    aria-label={'legal'} 
                    navlist={globalMenuState.legal}
                />
                {/* <Navigation className={styles['social-nav']} childElementsClasses={{listItem: styles['social-nav-item']}} aria-label={'social'} navlist={globalMenuState.socialNav}/> */}

            </div>
            {lightbox.isOpen && <LightboxComponent setOpen={lightbox.setLightbox} content={<Contact />} /> }
        </footer>
    )

   
}

export const Footer = memo(UnmemoizedFooter)