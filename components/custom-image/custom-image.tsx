import classNames from 'classnames'
import Image, { ImageProps } from 'next/image'
import { FC, memo, ReactEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import styles from './custom-image.module.css'

export interface ICustomImageProps extends Omit<ImageProps, 'objectFit'> {
	objectFit?: 'cover' | 'contain'
}

// The WordPress server answers bursts of parallel image requests with 503,
// which left random gaps in the galleries. A failed image is requested again a few times.
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

export const UnmemoizedCustomImage: FC<ICustomImageProps> = (props) => {
	const { className, children, fill = true, alt, objectFit, objectPosition, width, height, style, src, onError, ...attributes } = props
	const [retry, setRetry] = useState({ src, attempt: 0 })
	// a new src starts again with the first attempt
	const attempt = retry.src === src ? retry.attempt : 0
	const retryTimeout = useRef<ReturnType<typeof setTimeout>>()

	useEffect(() => {
		return () => clearTimeout(retryTimeout.current)
	}, [src])

	const handleError: ReactEventHandler<HTMLImageElement> = useCallback(
		(event) => {
			onError?.(event)
			if (attempt >= MAX_RETRIES) {
				return
			}
			// growing, randomized delay so the retries don't reach the server as a new burst
			const delay = RETRY_DELAY_MS * (attempt + 1) * (1 + Math.random())
			clearTimeout(retryTimeout.current)
			retryTimeout.current = setTimeout(() => setRetry({ src, attempt: attempt + 1 }), delay)
		},
		[attempt, onError, src]
	)

	const classes = classNames(styles.container, className)
	return (
		<div className={classes}>
			{/* a new key mounts a fresh <img>, so the browser requests the image again */}
			<Image key={attempt} alt={alt || ''} style={{ objectFit }} sizes={'(min-width: 768px) 70vw, (min-width: 680px) 50vw , 100vw'} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} src={src} {...attributes} onError={handleError} />
		</div>
	)
}

export const CustomImage = memo(UnmemoizedCustomImage)
