import Archive from '../../components/Archive/Archive';
import fetch from 'node-fetch'

const Index = Archive;

export async function getStaticProps({ params }) {
	const res = await fetch(`${process.env.API_URL}/posts/category/${params.category}`);
	const { posts } = await res.json();

	return {
		props: {
			posts
		},
	}
}

export async function getStaticPaths() {
	const res = await fetch(`${process.env.API_URL}/categories/routes`)
	const categories = await res.json();

	const paths = categories.map(({ slug }) => {
		return {
			params: {
				category: slug,
			}
		}
	})

	return {
		paths,
		fallback: false
	};
}

export default Index;