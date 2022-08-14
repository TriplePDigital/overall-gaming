import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Auth from '../../components/Auth'
import { useAuth } from '../../context/auth'
import Loader from '../../components/Loader'
import { useUser } from '@supabase/auth-helpers-react'

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
