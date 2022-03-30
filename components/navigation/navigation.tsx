import classNames from "classnames"
import Link from "next/link"
import { ComponentProps, FC, memo } from "react"
import { uid } from "react-uid"
import { NGColor } from "../../types/colors"
import { CustomImage, ICustomImageProps } from "../custom-image/custom-image"
import styles from './navigation.module.css'


export type TNavigationClasses = {
    list?: string
    listItem?: string
}
export interface INavItem extends ComponentProps<'li'> {
    label?: string
    href: string
    type: 'internal' | 'external'
    image?: ICustomImageProps
    openBlank?: boolean
}

export interface IInternalNavigationProps {
    childElementsClasses?: TNavigationClasses
}
export interface INavigationProps extends ComponentProps<'nav'> {
    navlist: INavItem[]
}

export const UnmemoizedNavigation: FC<INavigationProps & IInternalNavigationProps> = (props) => {
    const { className, children,  navlist, childElementsClasses, ...attributes} = props

    const classes = classNames(className)
    return (
        <nav className={classes} role='navigation' {...attributes}>
            <ul className={classNames(childElementsClasses?.list, 'flex')}>
                {navlist.map( item => {
                    return <li key={uid(item)} className={classNames(styles['list-item'], childElementsClasses?.listItem, 'font-style--s', `c-t--${NGColor.white}`)}>
                            { item.type === 'internal' ? (
                                <Link href={item.href}>
                                    <a target={item.openBlank ? '_blank' : '_self'}>
                                        {item.image ? (
                                            <CustomImage className={styles.icon} src={item.image.src} objectFit={'contain'}/>
                                        ) : <span>{item.label}</span>}
                                        
                                    </a>
                                </Link>
                            ) : (
                                <a href={item.href} target={item.openBlank ? '_blank' : '_self'}>
                                    {item.image ? (
                                            <CustomImage className={styles.icon} src={item.image.src} objectFit={'contain'}/>
                                        ) : <span>{item.label}</span>}
                                </a>
                            )}
                        </li>
                })}
            </ul>
        </nav>
    )
}

export const Navigation = memo(UnmemoizedNavigation)