import React from 'react'
import Navigation from '../components/Navigation'

function Layout({ children }) {
	return (
		<>
			<Navigation />
			<main className="container mx-auto">{children}</main>
		</>
	)
}

export default Layout
