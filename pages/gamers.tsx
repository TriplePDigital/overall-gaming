import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const Gamers = () => (
	<section>
		<h1>Gamers</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
			mollitia laboriosam possimus eaque? Aliquid, enim itaque sit
			reprehenderit unde quas delectus dicta laboriosam quidem vitae
			tenetur exercitationem sed ipsa! Quod?
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
			mollitia laboriosam possimus eaque? Aliquid, enim itaque sit
			reprehenderit unde quas delectus dicta laboriosam quidem vitae
			tenetur exercitationem sed ipsa! Quod?
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
			mollitia laboriosam possimus eaque? Aliquid, enim itaque sit
			reprehenderit unde quas delectus dicta laboriosam quidem vitae
			tenetur exercitationem sed ipsa! Quod?
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
			mollitia laboriosam possimus eaque? Aliquid, enim itaque sit
			reprehenderit unde quas delectus dicta laboriosam quidem vitae
			tenetur exercitationem sed ipsa! Quod?
		</p>
	</section>
)

export default Gamers

export const getServerSideProps = withPageAuth({ authRequired: true })
