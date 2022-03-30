import { ContextType, createContext, FC } from "react";
import { IGlobalMenuState, MenuContextType } from "./types";

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
            href: '/ueber-mich',
            type: 'internal'
        }
    ],
    socialNav: [
        {
            href: 'https://www.instagram.com',
            type: 'external',
            image: {
                src: '/assets/png/instagram.png'
            },
            openBlank: true
        },
        {
            href: 'https://www.xing.de',
            type: 'external',
            image: {
                src: '/assets/png/xing.png'
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