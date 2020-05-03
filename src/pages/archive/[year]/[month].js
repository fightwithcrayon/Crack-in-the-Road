import Archive from '../../../components/Archive/Archive';
import fetch from 'node-fetch';

const Index = Archive;

export async function getStaticProps({ params }) {
	const res = await fetch(`${process.env.API_URL}/posts/archive/${params.year}/${params.month}`);
	const posts = await res.json();

	const res2 = await fetch(`${process.env.API_URL}/posts/timeline`)
	const dates = await res2.json();
	const years = Object.keys(dates.reduce((all, current) => ({
		...all,
		[current._id.year]: null,
	}), {}));

	return {
		props: {
			posts,
			year: params.year,
			years
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