import classNames from 'classnames'
import { ComponentProps, FC, memo } from 'react'
import { uid } from 'react-uid'
import styles from './gallery-navigation.module.css'

export interface IGalleryNavigationProps extends ComponentProps<'nav'> {
	categories: Set<string>
	onNavItemClick?: (tag: string) => void
}

export const UnmemoizedGalleryNavigation: FC<IGalleryNavigationProps> = (props) => {
	const { className, children, categories, onNavItemClick, ...attributes } = props
	const classes = classNames(className)
	const tags = Array.from(categories)

	function handleClick(tag: string) {
		if (!onNavItemClick) return
		onNavItemClick(tag)
	}
	return (
		<nav className={classes} {...attributes}>
			<ul className={classNames(styles['nav-list'], 'grid')}>
				{tags.map((tag) => (
					<li key={uid(tag)} className={classNames(styles['nav-item'], 'font-style--s  flex flex--align-items-center')} onClick={() => handleClick(tag)}>
						{tag}
					</li>
				))}
			</ul>
		</nav>
	)
}

export const GalleryNavigation = memo(UnmemoizedGalleryNavigation)
