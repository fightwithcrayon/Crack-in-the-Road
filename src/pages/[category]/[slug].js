import styles from './Single.module.scss';
import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch'
import PostImage from '../../components/PostImage/PostImage';
import Featured from '../../components/Featured/Featured';

const Single = ({ data }) => {
    const {
        content,
    } = data;

    return (
        <div className={styles.page}>
            <Featured className={styles.header} post={data} tag="header" />
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export async function getStaticProps({ params: { slug } }) {
    const res2 = await fetch('../../../cache.json')
    const json = await res2.json();
    const data = json.find(post => post.slug === slug)
    return {
        props: {
            data
        },
    }
}

export async function getStaticPaths() {
    const fs = require('fs');
    const path = fs.existsSync('../../../cache.json') ? '../../../cache.json' : 'https://api.crackintheroad.com/posts/routes'

    const res = await fetch(path)
    const posts = await res.json();
    const json = JSON.stringify(posts);
    return new Promise((resolve) => {
        fs.writeFile('./cache.json', json, 'utf8', function (err) {
            if (err) {
                console.error("An error occured while writing JSON Object to File.");
                throw new Error();
            }
            const paths = posts.map(({ category, slug }) => {
                return {
                    params: {
                        category,
                        slug,
                    }
                }
            })

            resolve({
                paths: paths.slice(0, 1000),
                fallback: false
            });
        })
    });
}


export default Single;