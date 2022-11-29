import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentProps, FC, memo, MouseEvent } from 'react'
import { uid } from 'react-uid'
import { NGColor } from '../../types/colors'
import { CustomImage, ICustomImageProps } from '../custom-image/custom-image'
import styles from './navigation.module.css'

export type TNavigationClasses = {
	list?: string
	listItem?: string
}
// export interface INavItem extends ComponentProps<'li'> {
//     label?: string
//     href: string
//     type: 'internal' | 'external'
//     image?: ICustomImageProps
//     openBlank?: boolean

// }

interface IBasicNavItemProps extends ComponentProps<'li'> {
	label?: string
	image?: ICustomImageProps
	openBlank?: boolean
}

type TNavItemAsLink = IBasicNavItemProps & {
	as: 'link'
	href: string
	type: 'internal' | 'external'
}

type TNavItemAsSpan = IBasicNavItemProps & {
	as?: 'span'
}

export type TNavProps = TNavItemAsLink | TNavItemAsSpan

export interface IInternalNavigationProps {
	childElementsClasses?: TNavigationClasses
}
export interface INavigationProps extends ComponentProps<'nav'> {
	navlist: TNavProps[] /*INavItem[]*/
	menuItemClick?: () => void
}

export const UnmemoizedNavigation: FC<INavigationProps & IInternalNavigationProps> = (props) => {
	const { className, children, navlist, childElementsClasses, menuItemClick, ...attributes } = props

	const classes = classNames(className)

	const router = useRouter()
	return (
		<nav className={classes} role="navigation" {...attributes}>
			<ul className={classNames(childElementsClasses?.list, 'flex')}>
				{navlist.map((item) => {
					if (item.as === 'link') {
						return (
							<li key={uid(item)} className={classNames(styles['list-item'], childElementsClasses?.listItem, 'font-style--s', `c-t--${NGColor.white}`, item.type === 'internal' && router.pathname === item.href ? styles.active : '')} onClick={handleLinkClick}>
								{item.type === 'internal' ? (
									<Link href={item.href} className={classNames(styles.link, 'no-link')} title={item.label} target={item.openBlank ? '_blank' : '_self'}>
										{item.image ? <CustomImage className={styles.icon} alt={item.label || 'icon'} src={item.image.src} objectFit={'contain'} /> : <span>{item.label}</span>}
									</Link>
								) : (
									<a className={classNames(styles.link, 'no-link')} href={item.href} title={item.label} target={item.openBlank ? '_blank' : '_self'}>
										{item.image ? <CustomImage className={styles.icon} alt={item.label || 'icon'} src={item.image.src} sizes={item.image.sizes} objectFit={'contain'} /> : <span>{item.label}</span>}
									</a>
								)}
							</li>
						)
					} else {
						return (
							<li key={uid(item)} className={classNames(styles['list-item'], childElementsClasses?.listItem, 'font-style--s', `c-t--${NGColor.white}`)} onClick={item.onClick}>
								<div className={classNames(styles.link, 'no-link', styles.inline)}>
									<span title={item.label}>{item.label}</span>
								</div>
							</li>
						)
					}
				})}
			</ul>
		</nav>
	)

	function handleLinkClick(event: MouseEvent<HTMLLIElement>): void {
		const listElements = event.currentTarget.parentElement?.children
		if (listElements) {
			Array.from(listElements).map((element) => element.classList.remove(styles.active))
		}
		menuItemClick && menuItemClick()
	}
}

export const Navigation = memo(UnmemoizedNavigation)
