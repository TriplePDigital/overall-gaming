import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FaGamepad } from 'react-icons/fa'
import { BsFillPentagonFill } from 'react-icons/bs'
import { AiOutlineArrowRight } from 'react-icons/ai'

export default function Home() {
	const { user } = useUser()
	const router = useRouter()

	if (user) {
		router.push(`/user/${user.id}`)
	}
	return (
		<section className="flex h-full overflow-hidden">
			<div className="w-1/2 flex flex-col md:gap-16 items-center justify-center">
				<h1 className="text-7xl font-extrabold font-lato drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] shadow-black">
					Are you an og?
				</h1>
				<div className="border-og-purple-500 border rounded bg-gray-50 px-7 py-5 flex items-center relative gap-5 shadow">
					<div className="flex items-center justify-center my-5 mx-8">
						<FaGamepad size={35} className="z-10 text-white" />
						<BsFillPentagonFill
							size={85}
							className="text-og-500 absolute z-0"
						/>
					</div>
					<div className="font-inter">
						<h2 className="text-lg font-medium">
							Make an Account and Get Started
						</h2>
						<p className="text-sm text-gray-400 font-normal">
							Select games, record stats, join teams & get
							recruited!
						</p>
					</div>
					<Link href="/auth/login">
						<a>
							<AiOutlineArrowRight
								size={30}
								className="text-og-500"
							/>
						</a>
					</Link>
				</div>
			</div>
			<div className="w-1/2 relative">
				<div className="relative h-full z-10">
					<span
						style={{
							backgroundImage: `url('/lines.png')`,
						}}
						className="absolute -top-20 w-full h-full"
					></span>
				</div>
			</div>
		</section>
	)
}
