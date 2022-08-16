import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useEffect } from 'react'

const Welcome = () => {
	useEffect(() => {
		async function getGames() {
			const { data, error } = await supabaseClient.from('games').select()

			if (data) {
				console.log(data)
			}
			if (error) throw new Error(error)
		}
		getGames()
	}, [])
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
			<div className="flex-col flex items-center py-20 px-2 gap-3 w-1/2"></div>
		</section>
	)
}

export default Welcome
export const getServerSideProps: GetServerSideProps = withPageAuth({
	authRequired: true,
})
