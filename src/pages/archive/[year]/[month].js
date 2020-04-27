import Archive from '../../../components/Archive/Archive';
import fetch from 'node-fetch'

const Index = Archive;

export async function getStaticProps({ params }) {
	const res = await fetch(`${process.env.API_URL}/posts/archive/${params.year}/all`);
	const { posts } = await res.json();
	console.log(params)
	return {
		props: {
			posts
		},
	}
}

export async function getStaticPaths() {
	const res = await fetch(`${process.env.API_URL}/posts/timeline`)
	const dates = await res.json();

	const paths = dates.map(({ _id: { year, month } }) => {
		return {
			params: {
				month: month < 10 ? `0${month}` : month.toString(),
				year: year.toString(),
			}
		}
	})

	return {
		paths,
		fallback: false
	};
}

export default Index;