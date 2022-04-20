import classNames from "classnames";
import { ComponentProps, FC, memo, useContext } from "react";
import { globalMenuContext } from "../../data/menu-data/menu-context";
import { CustomImage } from "../custom-image/custom-image";
import { Navigation } from "../navigation/navigation";
import styles from './footer.module.css'

export interface IFooterProps extends ComponentProps<'footer'> {
    
}

 
export const UnmemoizedFooter: FC<IFooterProps> = (props) => {
    const {className,...attributes} = props
    const {globalMenuState} = useContext(globalMenuContext)
    const classes = classNames(className, styles.container, 'grid')
    return (
        <footer className={classes} {...attributes}>
            <div className={classNames(styles.copyright, 'flex')}>
                <CustomImage className={styles.logo} src={'/assets/svg/Logo_desingbuero.svg'}/>
                <p className={classNames('c-t--white font-style--xs')}>© 2022</p>
            </div>
            <Navigation className={classNames(styles['legal-nav'], 'font-style--xs')}childElementsClasses={{listItem: styles['legal-nav-item']}}  aria-label={'legal'} navlist={globalMenuState.legal}/>
            <Navigation className={styles['social-nav']} childElementsClasses={{listItem: styles['social-nav-item']}} aria-label={'social'} navlist={globalMenuState.socialNav}/>
        </footer>
    )
}

export const Footer = memo(UnmemoizedFooter)