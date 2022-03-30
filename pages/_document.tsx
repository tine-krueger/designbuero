import {Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return(
        <Html lang="de">
            <Head />
            <body>
                <Main />
                <div id={"ng-modal"}></div>
                <NextScript />
            </body>
        </Html>
    )
}