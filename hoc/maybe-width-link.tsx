import { link } from 'fs'
import Link from 'next/link'
import { ComponentType } from 'react'

export interface ILinkProps {
    href: string
    type: 'internal' | 'external'
    targetBlank?: boolean
    download?: boolean
}

function isLinkGuard<T>(props: any): props is ILinkProps & T {
    return undefined !== props.href
}

export function maybeWithLink<T>(Component: ComponentType<T>): ComponentType<T | T & ILinkProps> {
    return ( props: T ) => {
        if (isLinkGuard<T>(props)) {

            switch (props.type) {
                case 'internal': {
                    const {href, type, targetBlank, download, ...attributes} = props
                    return (<Link href={href}>
                        <a target={targetBlank ? '_blank' : '_self'} download={download}>
                            <Component {...attributes as unknown as T}/>
                        </a>
                    </Link>)
                }
                default: {
                    const {href, type, targetBlank, download, ...attributes} = props
                    return (
                        <a href={href}>
                            <Component {...attributes as unknown as T}/>
                        </a>
                        )
                }
            }
            
        }
        return <Component {...props}/>
    }
}               