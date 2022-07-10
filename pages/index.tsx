import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
// import Account from '../components/Account'
import Link from 'next/link'
import { useAuth } from '../context/auth'

export default function Home() {
	const [session, setSession] = useState(null)
	const { user } = useAuth()

	if (user) {
		return (
			<>
				<h1>Welcome {user.username}</h1>
				<Link href={`user/${user.id}`}>
					<a>Account</a>
				</Link>
			</>
		)
	} else {
		return (
			<>
				<h1>Log in to access the portal</h1>
				<Link href={`auth/login`}>
					<a className="bg-og-500">Login</a>
				</Link>
			</>
		)
	}
}
