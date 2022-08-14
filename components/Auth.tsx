import { Provider } from '@supabase/supabase-js'
import { useState } from 'react'
import Image from 'next/image'
import { AiOutlineLeft } from 'react-icons/ai'
import { FaDiscord, FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')

	const handleLogin = async (email: string): Promise<any> => {
		setLoading(true)
		if (!email) {
			setError('Please enter an email')
			setLoading(false)
			return
		}
		try {
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
		} catch (error) {
			throw new Error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleProviderLogin = async (provider: Provider): Promise<any> => {
		setLoading(true)
		try {
			const { error } = await supabase.auth.signIn({ provider })
			if (error) throw error
		} catch (error) {
			throw new Error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const signInWithDiscord = async () => {
		const { user, session, error } = await supabase.auth.signIn({
			provider: 'discord',
		})
		if (error) {
			throw new Error(error.message)
		}
	}

	return (
		<section className="flex w-full h-full">
			<div className="w-1/2 h-full bg-og-500 flex items-center justify-center">
				<div className="relative w-1/2">
					<Image
						src={'/logo_invert.svg'}
						layout="responsive"
						width={'100%'}
						height={'100%'}
						alt=""
					/>
				</div>
			</div>
			<div className="flex-col flex items-center py-20 px-2 gap-3 w-1/2">
				<div className="flex justify-between items-center w-full mb-5">
					<div className="flex gap-1">
						<AiOutlineLeft size={24} />
						Back
					</div>
					<div className="flex flex-col gap-1">
						<span>Step 01/03</span>
						<span>Personal Info</span>
					</div>
				</div>
				<p className="text-right w-full pr-20 mb-5 text-sm text-gray-500 font-inter">
					Don&apos;t have an account?{' '}
					<Link href="auth/register">
						<a className="text-blue-500 font-medium">
							Register Here
						</a>
					</Link>
				</p>
				<div className="mx-auto w-2/3 flex flex-col gap-5">
					<h1 className="font-inter font-bold text-3xl w-full">
						Login
					</h1>
					<p className="text-gray-400 text-lg">
						Log in to your account.
					</p>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleLogin(email)
						}}
					>
						<label
							className="font-medium text-sm text-gray-500"
							htmlFor="email"
						>
							Email Address
							<input
								className="border border-gray-200 focus:border-og-500 rounded px-7 py-5 focus:ring-og-500 focus:ring-1 focus:outline-none shadow-md block mt-1 text-gray-800 text-base w-full"
								type="email"
								placeholder="Enter Email Address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
						<button
							type="submit"
							className="bg-og-500 text-white w-full rounded px-7 py-4 block mt-5 shadow-md font-medium"
							disabled={loading}
						>
							<span>{loading ? 'Loading' : 'Login'}</span>
						</button>
					</form>
					<div className="w-full flex justify-between items-center gap-3 opacity-30 text-xs font-inter">
						<span className="border-b w-full"></span>
						Or
						<span className="border-b w-full"></span>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault()
							handleProviderLogin('discord')
						}}
						className="bg-white border border-gray-200 text-black w-full rounded px-7 py-4 flex items-center justify-center gap-5 mt-5 shadow-md font-medium"
						disabled={loading}
					>
						<FaDiscord size={26} />
						<span className="text-lg font-medium">
							{loading ? 'Loading' : 'Login using Discord'}
						</span>
					</button>

					<button
						onClick={(e) => {
							e.preventDefault()
							handleProviderLogin('google')
						}}
						className="bg-white border border-gray-200 text-black w-full rounded px-7 py-4 flex items-center justify-center gap-5 mt-5 shadow-md font-medium"
						disabled={loading}
					>
						<FaGoogle size={26} />
						<span className="text-lg font-medium">
							{loading ? 'Loading' : 'Login using Google'}
						</span>
					</button>

					<div className="col-6 form-widget">
						<div></div>
					</div>
				</div>
			</div>
		</section>
	)
}
