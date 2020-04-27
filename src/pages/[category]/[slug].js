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
        title,
    } = data;

    const description = content.length > 160 ? content.substring(0, content - 3) + "..." : content;

    return (
        <div className={styles.page}>
            <Head>
                <meta charset="utf-8" />
                <title key="title">{title}</title>
                <meta key="description" name="description" content="Big last decade." />
                <meta name="og:title" property="og:title" content={title} />
                <meta name="og:description" property="og:description" content={description} />
                <meta property="og:site_name" content={title} />
                <meta property="og:url" content={`https://www.crackintheroad.com/${category}/${slug}`} />
                <meta property="og:image" content="/logo.jpg" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="" />
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