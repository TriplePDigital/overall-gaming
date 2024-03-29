import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider supabaseClient={supabaseClient}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserProvider>
	)
}

export default MyApp
