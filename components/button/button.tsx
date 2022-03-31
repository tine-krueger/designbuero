import { ComponentProps, FC, memo } from "react"
import Link, { LinkProps } from 'next/link'
import styles from './button.module.css'
import classNames from "classnames"


type TButtonAsButton = IBasicButtonProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof IBasicButtonProps> & {
		as?: 'button'
	}

export type TButtonAsLink = IBasicButtonProps &
	Omit<LinkProps, keyof IBasicButtonProps> & {
		as: 'link'
		download?: boolean
	}

export type TButtonAsSpan = IBasicButtonProps &
	Omit<ComponentProps<'span'>, keyof IBasicButtonProps> & {
		as: 'span'
	}

export type TSharedButtonProps = TButtonAsLink | TButtonAsButton | TButtonAsSpan

export interface IBasicButtonProps extends ComponentProps<'button'> {
	label?: string
	layout?: 'round' | 'ellipse'
	accent?: 'circle'
	
}

export const UnmemoizedButton: FC<TSharedButtonProps> = (props) => {
	const {layout = 'ellipse', accent, ...attributes} = props
	console.log(layout)
    const classes = classNames(props.className, styles.container, styles[layout], accent ? styles[accent] : undefined, 'text-align--center text--uc')

	if (props.as === 'link') {
		const { label, children, as, className, download, layout, accent, ...rest } = props

        
		return (
			<Link {...rest}>
				<a className={classes} download={download}>
					{children ?? label}
                    <span className={styles["blob-wrapper"]}>
                        <span className={styles.blobs}>
                            <span className={styles.blob}></span>
                            <span className={styles.blob}></span>
                            <span className={styles.blob}></span>
                            <span className={styles.blob}></span>
                        </span>
                    </span>
				</a>
			</Link>
		)
	} else if (props.as === 'span') {
		const { label, children, layout, as, className, accent,...rest } = props
		return (
			<span {...rest} className={classes}>
				{children ?? label}
                <span className={styles["blob-wrapper"]}>
                    <span className={styles.blobs}>
                        <span className={styles.blob}></span>
                        <span className={styles.blob}></span>
                        <span className={styles.blob}></span>
                        <span className={styles.blob}></span>
                    </span>
                </span>
			</span>
		)
	} else {
		const { label, children, layout, as, className, accent, ...rest } = props
		return (
			<button {...rest} className={classes}>
				{children ?? label}
                <span className={styles["blob-wrapper"]}>
                    <span className={styles.blobs}>
                        <span className={styles.blob}></span>
                        <span className={styles.blob}></span>
                        <span className={styles.blob}></span>
                        <span className={styles.blob}></span>
                    </span>
                </span>
			</button>
		)
	}
}

export const Button = memo(UnmemoizedButton)