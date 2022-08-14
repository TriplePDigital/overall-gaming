import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../../utils/supabaseClient'
import Loader from '../../components/Loader'

export default function Account() {
	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState(null)
	const [website, setWebsite] = useState(null)
	const [avatarUrl, setAvatarUrl] = useState(null)

	async function getProfile() {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, website, avatar_url')
				.eq('id', user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUsername(data.username)
				setWebsite(data.website)
				setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			throw new Error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const { user } = useUser()

	async function updateProfile({ username, website, avatar_url }) {
		try {
			setLoading(true)

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date(),
			}

			const { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal', // Don't return the value after inserting
			})

			if (error) {
				throw error
			}
		} catch (error) {
			throw new Error(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getProfile()
	}, [])

	return loading ? (
		<Loader />
	) : (
		<div className="mx-auto w-1/3 flex flex-col items-center">
			<div className="my-2 w-full">
				<label htmlFor="username">Name</label>
				<input
					className="w-full block border border-gray-200 focus:border-og-500 rounded px-5 py-3 focus:ring-og-500 focus:ring-1 focus:outline-none shadow-md"
					id="username"
					type="text"
					defaultValue={username || ''}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="my-2 w-full">
				<label htmlFor="website">Website</label>
				<input
					className="w-full block border border-gray-200 focus:border-og-500 rounded px-5 py-3 focus:ring-og-500 focus:ring-1 focus:outline-none shadow-md"
					id="website"
					type="website"
					placeholder="https://example.com"
					defaultValue={website || ''}
					onChange={(e) => setWebsite(e.target.value)}
				/>
			</div>

			<button
				className="bg-og-500 text-white w-full rounded px-7 py-4 block mt-5 shadow-md font-medium"
				onClick={() =>
					updateProfile({ username, website, avatar_url: avatarUrl })
				}
				disabled={loading}
			>
				{loading ? 'Loading ...' : 'Update'}
			</button>
		</div>
	)
}
