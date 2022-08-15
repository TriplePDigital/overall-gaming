import * as React from 'react'
import { useRouter } from 'next/router'
import Navigation from './Navigation'

type LayoutProps = {
	children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
}

function Layout({ children }: LayoutProps) {
	const router = useRouter()

	return (
		<main className="h-screen">
			{!router.pathname.includes('auth') && <Navigation />}
			<section
				className={`${
					!router.pathname.includes('auth') && 'container mx-auto'
				} ${
					router.pathname === '/' &&
					'mx-0 max-w-none overflow-hidden max-h-screen'
				} w-full h-full`}
			>
				{children}
			</section>
		</main>
	)
}

export default Layout
