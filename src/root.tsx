import type { ReactNode } from 'react'
import {
    Links,
    Outlet,
    Scripts,
    ScrollRestoration
} from 'react-router'
import './index.css'

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="author" content="Lin Donglai"/>
                <meta name="referrer" content="strict-origin-when-cross-origin"/>
                <meta name="color-scheme" content="light"/>

                <link rel="icon" type="image/x-icon" href="/favicon/favicon-256.ico"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32.png"/>
                <link rel="icon" type="image/png" sizes="64x64" href="/favicon/favicon-64.png"/>
                <link rel="apple-touch-icon" sizes="256x256" href="/favicon/favicon-256.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <Links/>
            </head>
            <body>
                {children}
                <ScrollRestoration/>
                <Scripts/>
            </body>
        </html>
    )
}

export default function Root() {
    return <Outlet/>
}
