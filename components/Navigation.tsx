import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Dropdown, Avatar } from 'flowbite-react'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../utils/supabaseClient'

function Navigation() {
	const { user } = useUser()
	const router = useRouter()
	const [toggleOpen, setToggleOpen] = useState(false)

	const handleLogout = async () => {
		try {
			await supabase.auth.signOut()
			router.push('/')
			return
		} catch (error) {
			throw new Error(error.message)
		}
	}

	return (
		<nav
			className={`bg-og-500 w-full md:h-24 ${
				toggleOpen ? 'h-1/3' : 'h-16'
			} font-exo`}
		>
			<div className="mx-auto container py-2 h-full">
				<div className="flex justify-between md:items-center items-start gap-5 h-full">
					<Link href="/" passHref>
						<a
							className={`relative w-20  ${
								toggleOpen ? 'h-12 md:h-full' : 'h-full'
							}`}
						>
							<Image
								src="/logo_invert.svg"
								layout="fill"
								alt="Overall Gaming's logo with inverted colors"
							/>
						</a>
					</Link>
					<ul
						className={`flex md:flex-row flex-col text-center ${
							toggleOpen
								? 'visible place-self-end md:place-self-auto'
								: 'invisible md:visible'
						} gap-8 items-center text-white font-medium uppercase tracking-wider md:ml-10`}
					>
						<li className="relative ">
							<Link href="/gamers" passHref>
								<a className="after:visible after:opacity-0 hover:after:opacity-100 after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-white transition-opacity after:transition-opacity">
									Gamers
								</a>
							</Link>
						</li>
						<li className="relative">
							<Link href="/teams" passHref>
								<a className="after:visible after:opacity-0 hover:after:opacity-100 after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-white transition-opacity after:transition-opacity">
									Teams
								</a>
							</Link>
						</li>
						<li className="relative">
							<Link href="/orgs" passHref>
								<a className="after:visible after:opacity-0 hover:after:opacity-100 after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-white transition-opacity after:transition-opacity">
									Organizations
								</a>
							</Link>
						</li>
						<li className="relative">
							<Link href="/tournamentOrgs" passHref>
								<a className="after:visible after:opacity-0 hover:after:opacity-100 after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-white transition-opacity after:transition-opacity">
									Tournament Organizers
								</a>
							</Link>
						</li>
					</ul>
					<div className="flex gap-1 items-center">
						<button
							className="md:hidden block text-white focus:ring-og-purple-500 focus:border-og-purple-500 px-3 py-3"
							onClick={() => setToggleOpen(!toggleOpen)}
						>
							{toggleOpen ? (
								<AiOutlineClose size={24} />
							) : (
								<FaBars size={24} />
							)}
						</button>
						<ul className="flex gap-2">
							{user ? (
								<Dropdown
									arrowIcon={false}
									inline={true}
									label={
										user ? (
											<span className="relative w-10 h-10 rounded-full overflow-hidden">
												{/* TODO: Change this avatar URL to use profile avatar rather than account avatar */}
												<Image
													src={
														user.user_metadata
															.avatar_url
													}
													layout="fill"
													alt="Overall Gaming's logo with inverted colors"
												/>
											</span>
										) : (
											<Avatar
												alt="User settings"
												img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
												rounded={true}
											/>
										)
									}
								>
									<Dropdown.Header>
										<span className="block text-sm">
											{user.user_metadata.full_name}
										</span>
										<span className="block truncate text-sm font-semibold">
											{user.email}
										</span>
									</Dropdown.Header>
									<Dropdown.Item>
										<Link href={`/user/${user.id}`}>
											Settings
										</Link>
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item>
										<Link
											href={`/api/auth/logout?returnTo=/`}
										>
											Sign out
										</Link>
									</Dropdown.Item>
								</Dropdown>
							) : (
								<ul className="text-white font-medium uppercase tracking-wider flex gap-2">
									<li>
										<Link href="/auth/login" passHref>
											<a>Sign Up</a>
										</Link>
									</li>
									<span className=""> | </span>
									<li>
										<Link href="/auth/login" passHref>
											<a>Log In</a>
										</Link>
									</li>
								</ul>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navigation
