import React from 'react'
import Navigation from '../components/Navigation'
import { useRouter } from 'next/router'

function Layout({ children }) {
	const router = useRouter()
	console.log(router.pathname === '/' ? 'true' : 'false')

	return (
		<main className="h-screen w-screen">
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
