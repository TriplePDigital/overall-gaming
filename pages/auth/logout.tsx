import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Logout = () => {
	const router = useRouter()
	useEffect(() => {
		const logout = async () => {
			await supabaseClient.auth.signOut()
			router.push('/')
		}
		logout()
	}, [])

	return <div>Logout</div>
}

export default Logout
