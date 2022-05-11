import { ComponentProps, FC, memo } from "react"
import Link, { LinkProps } from 'next/link'
import styles from './button.module.css'
import classNames from "classnames"
import { NGColor } from "../../types/colors"


type TButtonAsButton = IBasicButtonProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof IBasicButtonProps> & {
		as?: 'button'
	}

export type TButtonAsLink = IBasicButtonProps & {
		as: 'link'
		link: TInternalLink | TExternalLink
		download?: boolean
	}

export type TInternalLink = LinkProps & {
	type: 'internal',
	download?: boolean
}

export type TExternalLink = ComponentProps<'a'> & {
	type: 'external' | 'mail' | 'tel' | 'file'
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
	backgroundColor?: NGColor
	blobColor?: NGColor

	
}

export const UnmemoizedButton: FC<TSharedButtonProps> = (props) => {
	const {layout = 'ellipse', accent, backgroundColor, blobColor, ...attributes} = props
    const classes = classNames(
		styles.container, 
		props.className,  
		styles[layout], 
		accent ? styles[accent] : undefined, 
		'text-align--center text--uc', 
		{[`c-bg--${backgroundColor}`]: backgroundColor},
		{[`c-hili--${blobColor}`] : blobColor}
		)

	if (props.as === 'link') {
		const { label, children, className, link, blobColor, backgroundColor, ...rest } = props
		
		switch (link.type) {
			case 'internal': {
				const { type, download, ...attrbiutes} = link

				return (
					<Link {...attrbiutes}>
						<a className={classNames(classes, 'no-link')} download={download} >
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
			}

			case 'file': {
				const { type, download, ...attributes} = link
				return (
					<a className={classNames(classes, 'no-link')} download target={'_blank'} rel={'noopener'} {...attributes}>
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
				)
			}
		
			default:
				const { type, download, ...attributes} = link
				return (
					<a className={classNames(classes, 'no-link')} download={download} {...attributes}>
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
				)
		}
		
	} else if (props.as === 'span') {
		const { label, children, layout, as, className, accent, blobColor, backgroundColor, ...rest } = props
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
		const { label, children, layout, as, className, accent, blobColor, backgroundColor, ...rest } = props
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
