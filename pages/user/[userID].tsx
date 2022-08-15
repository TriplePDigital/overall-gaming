import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
	supabaseClient as supabase,
	withPageAuth,
} from '@supabase/auth-helpers-nextjs'
import Loader from '../../components/Loader'

interface Profile {
	id: string
	username: string
	website: string
	avatar_url: string
}

export default function Account({ user }: { user: Profile }) {
	const [loading, setLoading] = useState(true)
	const [profile, setProfile] = useState({} as Profile)

	async function getProfile(dbUser: { id: string }) {
		try {
			setLoading(true)
			const { data, error, status } = await supabase
				.from<Profile>('profiles')
				.select('username, website, avatar_url')
				.eq('id', dbUser.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setProfile({
					id: dbUser.id,
					username: data.username,
					website: data.website,
					avatar_url: data.avatar_url,
				})
			}
		} catch (error: any) {
			throw new Error(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function updateProfile({
		username,
		website,
		avatarUrl,
	}: {
		username: string
		website: string
		avatarUrl: string
	}) {
		try {
			setLoading(true)

			const updates = {
				id: user!.id,
				username,
				website,
				avatar_url: avatarUrl,
				updated_at: new Date(),
			}

			const { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal', // Don't return the value after inserting
			})

			if (error) {
				throw error
			}
		} catch (error: any) {
			throw new Error(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (user) getProfile(user)
	}, [user])

	return loading ? (
		<Loader />
	) : (
		<div className="mx-auto w-1/3 flex flex-col items-center">
			<div className="my-2 w-1/2 h-64 rounded-full overflow-hidden relative shadow">
				<Image
					src={profile.avatar_url}
					alt={profile.username}
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					loading="lazy"
					quality={50}
				/>
			</div>
			<div className="my-2 w-full">
				<label htmlFor="username">Name</label>
				<input
					className="w-full block border border-gray-200 focus:border-og-500 rounded px-5 py-3 focus:ring-og-500 focus:ring-1 focus:outline-none shadow-md"
					id="username"
					type="text"
					defaultValue={profile.username || ''}
					onChange={(e) =>
						setProfile(() => ({
							...profile,
							username: e.target.value,
						}))
					}
				/>
			</div>
			<div className="my-2 w-full">
				<label htmlFor="website">Website</label>
				<input
					className="w-full block border border-gray-200 focus:border-og-500 rounded px-5 py-3 focus:ring-og-500 focus:ring-1 focus:outline-none shadow-md"
					id="website"
					type="website"
					placeholder="https://example.com"
					defaultValue={profile.website || ''}
					onChange={(e) =>
						setProfile(() => ({
							...profile,
							website: e.target.value,
						}))
					}
				/>
			</div>

			<button
				className="bg-og-500 text-white w-full rounded px-7 py-4 block mt-5 shadow-md font-medium"
				onClick={() =>
					updateProfile({
						username: profile.username,
						website: profile.website,
						avatarUrl: profile.avatar_url,
					})
				}
				disabled={loading}
			>
				{loading ? 'Loading ...' : 'Update'}
			</button>
		</div>
	)
}

export const getServerSideProps = withPageAuth({ redirectTo: '/auth/login' })
