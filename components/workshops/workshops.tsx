import classNames from 'classnames'
import { FC } from 'react'
import { NGColor } from '../../types/colors'
import { Headline, PriorityStyle } from '../headline/headline'
import { WorkShop } from './workshop/workshop'
import styles from './workshops.module.css'
import { WorkshopsProps } from './workshops.types'

const Workshops: FC<WorkshopsProps> = (props) => {
	const { workshops, className } = props
	return (
		<div className={classNames(styles.container, className)}>
			<Headline className={styles.headline} priority={2} priorityStyle={PriorityStyle.h1} text={'Workshops'} textColor={NGColor.petrol} />
			<div className={classNames(styles.workshops)}>
				{workshops ? (
					workshops.map((workshop, index) => {
						return <WorkShop key={index} {...workshop} />
					})
				) : (
					<p className={styles['no-workshops']}>Gerade stehen keine Workshops an, aber in Kürze gibt es wieder neue Infos!</p>
				)}
			</div>
		</div>
	)
}

export default Workshops
