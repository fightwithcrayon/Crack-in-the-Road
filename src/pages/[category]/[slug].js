import styles from './Single.module.scss';
import fetch from 'node-fetch'
import Featured from '../../components/Featured/Featured';
import Head from 'next/head';
import React from 'react';

const Single = ({ data }) => {
    const {
        category,
        content,
        slug,
        old_image,
        title,
    } = data;

    const description = content.length > 160 ? content.substring(0, content - 3) + "..." : content;

    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <title key="title">{title}</title>
                <meta key="ogtitle" name="og:title" property="og:title" content={title} />
                <meta key="ogdescription" name="og:description" property="og:description" content={description} />
                <meta key="ogsite_name" property="og:site_name" content={title} />
                <meta key="ogurl" property="og:url" content={`https://www.crackintheroad.com/${category}/${slug}`} />
                <meta key="ogimage" property="og:image" content={`https://api.crackintheroad.com/images/${old_image}?type=jpg&width=1200&height=630`} />
                <meta key="ogimagetype" property="og:image:type" content="image/jpeg" />
                <meta key="ogimagewidth" property="og:image:width" content="1200" />
                <meta key="ogimageheight" property="og:image:height" content="630" />
                <meta key="ogimagealt" property="og:image:alt" content={title} />
                <meta key="twittercard" name="twitter:card" content="summary_large_image" />
                <meta key="twittertitle" name="twitter:title" content={title} />
                <meta key="twitterdescription" name="twitter:description" content={description} />
            </Head>
            <div className={styles.page}>
                <Featured className={styles.header} hasAuthor post={data} tag="header" />
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </>
    );
};

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${process.env.API_URL}/posts/single/${slug}`)
    const results = await res.json();
    console.log('Completed', slug);

    return {
        props: {
            data: results[0]
        },
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.API_URL}/posts/routes`)
    const posts = await res.json();

    const paths = posts.map(({ category, slug }) => {
        return {
            params: {
                category,
                slug
            }
        }
    }).slice(0, 500);

    return {
        paths,
        fallback: true
    };
}


export default Single;