import React from 'react'

function Navigation() {
	return (
		<nav className="bg-og-500 w-full">
			<div className="mx-auto container items-center flex text-white justify-between font-exo font-medium uppercase tracking-wider py-2">
				<div className="flex gap-5">
					<img src="/logo_invert.svg" />
					<ul className="ml-10 flex gap-8 items-center">
						<li>Gamers</li>
						<li>Teams</li>
						<li>Organizations</li>
						<li>Tournament Organizers</li>
					</ul>
				</div>
				<ul className="flex gap-2">
					<li>Sign Up</li>
					<span className=""> | </span>
					<li>Log In</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navigation
