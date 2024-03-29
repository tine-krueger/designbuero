import { createContext, FC, PropsWithChildren, useState } from 'react'
import instagram from '../../public/assets/png/instagram.png'
import xing from '../../public/assets/png/xing.png'
import { IGlobalMenuState, MenuContextType } from './types'

export interface IGlobalMenuStoreProps {}

export const GlobalMenuStore: FC<PropsWithChildren<IGlobalMenuStoreProps>> = (props) => {
	const globalMenu: IGlobalMenuState = {
		main: [
			{
				label: 'Home',
				as: 'link',
				href: '/',
				type: 'internal',
			},
			{
				label: 'Illustration',
				as: 'link',
				href: '/illustration',
				type: 'internal',
			},
			{
				label: 'Business Graphics',
				as: 'link',
				href: '/business-graphics',
				type: 'internal',
			},
			{
				label: 'Kreativ',
				as: 'link',
				href: '/kreativ',
				type: 'internal',
			},
			{
				label: 'Über',
				as: 'link',
				href: '/about-me',
				type: 'internal',
			},
		],
		socialNav: [
			{
				href: 'mailto:ng@desingbuero.de?subject=Anfrage%20Kreativ&body=Hallo%20Frau%20Giesler,',
				as: 'link',
				type: 'external',
				image: {
					src: '/assets/svg/email.svg',
					sizes: '25px',
					alt: 'Email Link',
				},
				openBlank: true,
			},
			{
				href: ' https://www.instagram.com/desingbuero/',
				as: 'link',
				type: 'external',
				image: {
					src: instagram,
					sizes: '25px',
					alt: 'Instagram Link',
				},
				openBlank: true,
			},
			{
				href: 'https://www.xing.com/profile/Nadine_Giesler/cv',
				as: 'link',
				type: 'external',
				image: {
					src: xing,
					sizes: '25px',
					alt: 'Xing Link',
				},
				openBlank: true,
			},
		],
		legal: [
			{
				label: 'Datenschutz',
				as: 'link',
				href: '/privacy',
				type: 'internal',
			},
			{
				label: 'Impressum',
				as: 'link',
				href: '/imprint',
				type: 'internal',
			},
			{
				label: 'Kontakt',
				as: 'span',
				onClick: openLightbox,
			},
		],
	}
	const [lightboxIsOpen, setLightboxIsOpen] = useState<boolean>(false)
	function openLightbox() {
		setLightboxIsOpen(true)
	}
	const { children } = props
	return <globalMenuContext.Provider value={{ globalMenuState: globalMenu, lightbox: { isOpen: lightboxIsOpen, setLightbox: setLightboxIsOpen } }}>{children}</globalMenuContext.Provider>
}

export const globalMenuContext = createContext({} as MenuContextType)
