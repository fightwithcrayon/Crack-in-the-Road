import styles from './Single.module.scss';
import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch'
import PostImage from '../../components/PostImage/PostImage';
import Featured from '../../components/Featured/Featured';

const Single = ({ data }) => {
    const {
        content,
        featured_image,
        title,
    } = data;

    return (
        <div className={styles.page}>
            <Featured className={styles.header} post={data} tag="header" />
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`https://api.crackintheroad.com/posts?slug=${slug}`)
    const results = await res.json();

    return {
        props: {
            data: results[0]
        },
    }
}

export async function getStaticPaths() {
    const res2 = await fetch('https://api.crackintheroad.com/posts/routes')
    const posts = await res2.json();
    const paths = posts.map(({ category, slug }) => {
        return {
            params: {
                category,
                slug
            }
        }
    })

    return {
        paths: paths.slice(0, 1000),
        fallback: false
    };
}


export default Single;