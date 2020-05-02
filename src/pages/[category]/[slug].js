import styles from './Single.module.scss';
import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch'
import PostImage from '../../components/PostImage/PostImage';
import Featured from '../../components/Featured/Featured';
import Head from 'next/head';

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
        <div className={styles.page}>
            <Head>
                <meta charset="utf-8" />
                <title key="title">{title}</title>
                <meta key="og:title" name="og:title" property="og:title" content={title} />
                <meta key="og:description" name="og:description" property="og:description" content={description} />
                <meta key="og:site_name" property="og:site_name" content={title} />
                <meta property="og:url" content={`https://www.crackintheroad.com/${category}/${slug}`} />
                <meta key="og:image" property="og:image" content={`https://api.crackintheroad.com/images/${old_image}?width=1200&height=630`} />
                <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta key="twitter:title" name="twitter:title" content={title} />
                <meta key="twitter:description" name="twitter:description" content={description} />
            </Head>
            <Featured className={styles.header} hasAuthor post={data} tag="header" />
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
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
    })

    return {
        paths,
        fallback: false
    };
}


export default Single;