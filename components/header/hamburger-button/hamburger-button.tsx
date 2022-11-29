import classNames from 'classnames'
import { ComponentProps, FC, memo } from 'react'
import styles from './hamburger-button.module.css'

export interface IHamburgerButtonProps extends ComponentProps<'button'> {
	isMenuOpen: boolean
}

const UnmemoizedHamburgerButton: FC<IHamburgerButtonProps> = (props) => {
	const { className, isMenuOpen, ...attributes } = props
	const classes = classNames(styles.container, className, { [styles.crossed]: isMenuOpen })
	return (
		<button className={classes} {...attributes}>
			<span className={classNames(styles.hamburger, 'flex flex--direction-column flex--justify-content-between')}>
				<span className={styles['hamburger-line']}></span>
				<span className={styles['hamburger-line']}></span>
				<span className={styles['hamburger-line']}></span>
			</span>
		</button>
	)
}

export const HamburgerButton = memo(UnmemoizedHamburgerButton)
