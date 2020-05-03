import Archive from '../../../components/Archive/Archive';
import fetch from 'node-fetch'

const Index = Archive;

export async function getStaticProps({ params }) {
	const pageUrl = `${process.env.API_URL}/posts/archive/${params.year}/all`;
	const res = await fetch(pageUrl);
	const posts = await res.json();

	const res2 = await fetch(`${process.env.API_URL}/posts/timeline`)
	const dates = await res2.json();
	const years = Object.keys(dates.reduce((all, current) => ({
		...all,
		[current._id.year]: null,
	}), {}));

	return {
		props: {
			pageUrl,
			posts,
			year: params.year,
			years
		},
	}
}

export async function getStaticPaths() {
	const res = await fetch(`${process.env.API_URL}/posts/timeline`)
	const dates = await res.json();
	const years = Object.keys(dates.reduce((all, current) => ({
		...all,
		[current._id.year]: null,
	}), {}));
	const paths = years.map(year => {
		return {
			params: {
				year,
			}
		}
	})

	return {
		paths,
		fallback: false
	};
}

export default Index;