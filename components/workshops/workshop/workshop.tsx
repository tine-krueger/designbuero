import classNames from 'classnames'
import { FC } from 'react'
import { NGColor } from '../../../types/colors'
import { Button } from '../../button/button'
import { CustomImage } from '../../custom-image/custom-image'
import { Headline } from '../../headline/headline'
import styles from './workshop.module.css'
import { WorkshopProps } from './workshop.types'

export const WorkShop: FC<WorkshopProps> = (props) => {
	const { title, content, featuredImage, startDate, startTime, endTime, city, ...rest } = props
	return (
		<div className={classNames(styles.container, { [styles['container--no-image']]: !featuredImage })}>
			{featuredImage && <CustomImage className={classNames(styles.image)} objectFit={'cover'} {...featuredImage} />}

			<div className={styles.title}>
				<Headline className={classNames(styles.headline)} priority={3} textColor={NGColor.petrol}>
					{title}
				</Headline>
			</div>

			<p className={classNames(styles.meta, 'bold')}>
				Datum: {startDate} <br />
				Uhrzeit: {startTime} Uhr - {endTime} Uhr
				<br />
				Ort: {city}
			</p>
			{content && <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />}
			<Button
				className={classNames(styles['register-button'], 'c-bg--6 c-hili--7')}
				as="link"
				link={{
					type: 'mail',
					href: `mailto:ng@desingbuero.de?subject=Anfrage%20Portfolio&body=Hallo%20Frau%20Giesler%2C%20%0A%0Ahiermit%20m%C3%B6chte%20ich%20mich%20verbindlich%20an%20folgendem%20Workshop%20anmelden%3A%0A%0ATitel%3A%20${title}%0ADatum%3A%20${startDate}%20%0AUhrzeit%3A%20${startTime}%20Uhr%20`,
				}}
			>
				Anmelden
			</Button>
		</div>
	)
}
