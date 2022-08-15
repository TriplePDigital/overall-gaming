import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
import Auth from '../../components/Auth'

function Login() {
	const [loading, setLoading] = useState(true)
	const { user } = useUser()
	const router = useRouter()

	if (user) {
		router.push('/')
	}

	return (
		<>
			<Auth />
		</>
	)
}

export default Login
