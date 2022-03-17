import Link from 'next/link'
import { ComponentType } from 'react'

export interface ILinkProps {
    link: string
}

function isLinkGuard<T>(props: any): props is ILinkProps & T {
    return undefined !== props.link
}

export function maybeWithLink<T>(Component: ComponentType<T>): ComponentType<T | T & ILinkProps> {
    return ( props: T ) => {
        if (isLinkGuard<T>(props)) {
            const { link, ...attributes } = props
            return (<Link href={link}>
                <a>
                    <Component {...attributes as unknown as T}/>
                </a>
            </Link>)
        }
        return <Component {...props}/>
    }
}