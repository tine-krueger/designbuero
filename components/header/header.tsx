import classNames from "classnames"
import Link from "next/link"
import { ComponentProps, FC, memo, useContext, useEffect, useState } from "react"
import { globalMenuContext } from "../../data/menu-data/menu-context"
import { useMediaQuery } from "../../hooks/media-query-hook"
import { CustomImage } from "../custom-image/custom-image"
import { Navigation } from "../navigation/navigation"
import { HamburgerButton } from "./hamburger-button/hamburger-button"
import styles from './header.module.css'

export interface IHeaderProps extends ComponentProps<'header'> {
    
}
 
export const UnmemoizedHeader: FC<IHeaderProps> = (props) => {
    const {className, ...attributes} = props
    const isBreakpoint = useMediaQuery(1024)
    const {globalMenuState} = useContext(globalMenuContext)
    const [small, setSmall] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const classes = classNames(className, styles.container, {[styles.small] : small }, {[styles.open] : menuOpen})
    
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
        <header className={classNames(classes)} {...attributes} >
            <div className={classNames(styles['inner-wrapper'],'grid grid--justify-items-center')}>
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
                    {isBreakpoint ? (
                        <HamburgerButton onClick={toggleMenuOpen} isMenuOpen={menuOpen}/>
                    ): (
                        <>
                            <Navigation className={classNames(styles['main-navigation'])} childElementsClasses={{list: styles['main-navigation-list'], listItem: styles['main-navigation-list-item']}} aria-label="main" navlist={globalMenuState.main}/>
                            <Navigation 
                                className={classNames(styles['social-nav'])} 
                                childElementsClasses={{
                                    listItem: classNames(styles['social-nav-item'], 'icon-hover')
                                }} 
                                aria-label={'social'} 
                                navlist={globalMenuState.socialNav}
                            />
                        </>
                    )}
                    
                </div>

            </div>
            
           
            {isBreakpoint && <div className={classNames(styles['mobile-navigation-wrapper'])}>
                <Navigation menuItemClick={toggleMenuOpen} className={classNames(styles['mobile-main-navigation'])} childElementsClasses={{list: styles['mobile-navigation-list'], listItem: styles['mobile-navigation-list-item']}} aria-label="main" navlist={globalMenuState.main}/>
                <Navigation 
                    menuItemClick={toggleMenuOpen} 
                    className={classNames(styles['mobile-social-nav'])} 
                    childElementsClasses={{
                        listItem: (classNames(styles['social-nav-item'], 'icon-hover'))
                        }} 
                    aria-label={'social'} 
                    navlist={globalMenuState.socialNav}
                />
            </div>}
           
        </header>
    )

    function toggleMenuOpen() {
        setMenuOpen(!menuOpen)
    }
}

export const Header = memo(UnmemoizedHeader)