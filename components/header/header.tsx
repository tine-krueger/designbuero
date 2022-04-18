import classNames from "classnames"
import Link from "next/link"
import { ComponentProps, FC, memo, useContext, useEffect, useState } from "react"
import { globalMenuContext } from "../../data/menu-data/menu-context"
import { CustomImage } from "../custom-image/custom-image"
import { Navigation } from "../navigation/navigation"
import styles from './header.module.css'
import logoDesingbuero from '../../public/assets/svg/Logo_desingbuero.svg'

export interface IHeaderProps extends ComponentProps<'header'> {
    
}
 
export const UnmemoizedHeader: FC<IHeaderProps> = (props) => {
    const {className, ...attributes} = props
    
    const {globalMenuState} = useContext(globalMenuContext)
    const [small, setSmall] = useState<boolean>(false);
    const classes = classNames(className, styles.container, 'grid grid--justify-items-center', {[styles.small] : small })
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
                <a className={classNames(styles['home-link'], 'no-link')}>
                    <CustomImage className={styles.logo}  src={logoDesingbuero}/>
                </a>
            </Link>

            <div className={styles['nav-wrapper']}>
                <Link href={'/'}>
                    <a className={classNames(styles['home-link--small'], 'no-link')}>
                        <CustomImage className={styles.logo}  src={logoDesingbuero}/>
                    </a>
                </Link>
                <Navigation className={styles['main-navigation']} childElementsClasses={{list: styles['main-navigation-list'], listItem: styles['main-navigation-list-item']}} aria-label="main" navlist={globalMenuState.main}/>
                <Navigation className={styles['social-nav']} childElementsClasses={{listItem: styles['social-nav-item']}} aria-label={'social'} navlist={globalMenuState.socialNav}/>
            </div>
            
            
        </header>
    )
}

export const Header = memo(UnmemoizedHeader)