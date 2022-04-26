import { createContext, FC } from "react";
import { IGlobalMenuState, MenuContextType } from "./types";
import instagram from '../../public/assets/png/instagram.png'
import xing from '../../public/assets/png/xing.png'

const globalMenu: IGlobalMenuState = {
    main: [
        {
            label: 'Home',
            href: '/',
            type: 'internal'
        },
        {
            label: 'Illustration',
            href: '/illustration',
            type: 'internal'
        },
        {
            label: 'Business Graphics',
            href: '/business-graphics',
            type: 'internal'
        },
        {
            label: 'Kreativ',
            href: '/kreativ',
            type: 'internal'
        },
        {
            label: 'Über',
            href: '/about-me',
            type: 'internal'
        }
    ],
    socialNav: [
        {
            href: ' https://www.instagram.com/desingbuero/',
            type: 'external',
            image: {
                src: instagram,
                sizes: '25px'
            },
            openBlank: true
        },
        {
            href: 'https://www.xing.com/profile/Nadine_Giesler/cv',
            type: 'external',
            image: {
                src: xing,
                sizes: '25px'
            },
            openBlank: true
        }
    ],
    legal: [
        {
            label: 'Datenschutz',
            href: '/datenschutz',
            type: 'internal'
        },
        {
            label: 'Impressum',
            href: '/impressum',
            type: 'internal'
        }
    ]
}

export interface IGlobalMenuStoreProps {}

export const GlobalMenuStore: FC<IGlobalMenuStoreProps> = (props) => {
    const {children} = props
    return <globalMenuContext.Provider value={{globalMenuState: globalMenu}}>{children}</globalMenuContext.Provider>
}

export const globalMenuContext = createContext({} as MenuContextType)