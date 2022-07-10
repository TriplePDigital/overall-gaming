import React, { useState } from 'react'
import Auth from '../../components/Auth'
import { useAuth } from '../../context/auth'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'

function Login() {
	const [loading, setLoading] = useState(true)
	const { user } = useAuth()
	const router = useRouter()

	if (user) {
		router.push('/')
	}

	return loading ? (
		<Loader />
	) : (
		<>
			<Auth />
		</>
	)
}

export default Login
