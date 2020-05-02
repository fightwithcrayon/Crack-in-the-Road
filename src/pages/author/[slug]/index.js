import Archive from '../../../components/Archive/Archive';
import fetch from 'node-fetch'

const Index = Archive;

export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(`${process.env.API_URL}/posts/author/${slug}`);
	const { posts } = await res.json();
	console.log(posts);
	return {
		props: {
			posts,
		},
	}
}

export async function getStaticPaths() {
	const res = await fetch(`${process.env.API_URL}/authors`)
	const authors = await res.json();
	const paths = authors.map(author => {
		return {
			params: {
				slug: author.slug,
			}
		}
	})

	return {
		paths,
		fallback: false
	};
}

export default Index;