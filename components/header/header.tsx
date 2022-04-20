import classNames from "classnames"
import Link from "next/link"
import { ComponentProps, FC, memo, useContext, useEffect, useState } from "react"
import { globalMenuContext } from "../../data/menu-data/menu-context"
import { CustomImage } from "../custom-image/custom-image"
import { Navigation } from "../navigation/navigation"
import { HamburgerButton } from "./hamburger-button/hamburger-button"
import styles from './header.module.css'

export interface IHeaderProps extends ComponentProps<'header'> {
    
}
 
export const UnmemoizedHeader: FC<IHeaderProps> = (props) => {
    const {className, ...attributes} = props
    
    const {globalMenuState} = useContext(globalMenuContext)
    const [small, setSmall] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const classes = classNames(className, styles.container, 'grid grid--justify-items-center', {[styles.small] : small }, {[styles.open] : menuOpen})
    function scrollHandler() {
        setSmall(window.scrollY > 10)
    }
    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", scrollHandler
          
        );

        return () => window.removeEventListener("scroll", scrollHandler)
      }
    }, []);
    
    return (
        <header className={classNames(classes)} >
            <Link href={'/'}>
                <a className={classNames(styles['home-link'], 'no-link visible-m')}>
                    <CustomImage className={styles.logo}  src={'/assets/svg/Logo_desingbuero.svg'}/>
                </a>
            </Link>

            <div className={styles['nav-wrapper']}>
                <Link href={'/'}>
                    <a className={classNames(styles['home-link--small'], 'no-link')}>
                        <CustomImage className={styles.logo}  src={'/assets/svg/Logo_desingbuero.svg'}/>
                    </a>
                </Link>

                <HamburgerButton onClick={toggleMenuOpen} isMenuOpen={menuOpen}/>
                <Navigation className={classNames(styles['main-navigation'], 'visible-m')} childElementsClasses={{list: styles['main-navigation-list'], listItem: styles['main-navigation-list-item']}} aria-label="main" navlist={globalMenuState.main}/>
                <Navigation className={classNames(styles['social-nav'], 'visible-m')} childElementsClasses={{listItem: styles['social-nav-item']}} aria-label={'social'} navlist={globalMenuState.socialNav}/>
            </div>
           
                <div className={classNames(styles['mobile-navigation-wrapper'])}>
                    <Navigation menuItemClick={toggleMenuOpen} className={classNames(styles['mobile-main-navigation'])} childElementsClasses={{list: styles['mobile-navigation-list'], listItem: styles['mobile-navigation-list-item']}} aria-label="main" navlist={globalMenuState.main}/>
                    <Navigation menuItemClick={toggleMenuOpen} className={classNames(styles['mobile-social-nav'])} childElementsClasses={{listItem: styles['social-nav-item']}} aria-label={'social'} navlist={globalMenuState.socialNav}/>
                </div>
           
        </header>
    )

    function toggleMenuOpen() {
        setMenuOpen(!menuOpen)
    }
}

export const Header = memo(UnmemoizedHeader)