import classNames from 'classnames';
import { ComponentProps, FC, memo } from 'react';
import { Headline } from '../headline/headline';
import Envelope from '../../public/assets/svg/email.svg'
import Phone from '../../public/assets/svg/phone-thin.svg'
import styles from './contact.module.css'
import { NGColor } from '../../types/colors';

export interface IContactProps extends ComponentProps<'section'> {
    
}



export const UnmemoizedContact: FC<IContactProps> = (props) => {
    const {className,...attributes} = props
    const classes = classNames(className, styles.container)
    return (
            <section className={classNames(classes, `c-bg--${NGColor.shellwhite}`)}>
                <Headline priority={2} text={'Kontakt'}/>
                <div className={classNames(styles['content-wrapper'], 'flex')}>
                    <p> 
                        Nadine Giesler <br />
                        desingbüro<br />
                        Feldstegel 16a<br />
                        21039 Hamburg
                    </p>
                    <div className={classNames(styles['tel-mail'], 'p p-t')}>
                        <span className={classNames(styles['contact-media'], 'grid')}>
                            <Envelope />
                            <a href='mailto:ng@desingbuero.de'>ng@desingbuero.de</a>
                        </span>
                        <span className={classNames(styles['contact-media'], 'grid')}>
                        
                            <Phone />
                            <a href='tel:00494036826861'>040-368 268 61</a>
                        </span>
                    </div>
                </div>
            </section>
    ) 
}

export const Contact = memo(UnmemoizedContact)