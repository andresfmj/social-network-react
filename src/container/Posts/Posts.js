import React, { useState, useEffect } from 'react';

import './Posts.scss';
import PostItem from '../../components/PostItem/PostItem';

import { request } from '../../helpers/request';

import { API_URL } from '../../helpers/constants';


function Posts(props) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchData = async () => {
        const req = await request(`${API_URL}/post?limit=5&page=0`, 'GET', null)
        if (req.ok) {
            const response = await req.json()
            const data = response.data
            setPosts(data)
            setLoading(false)
        } else {
            setError(`${req.status} ${req.statusText}`)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="Posts">
            {loading && <p>Obteniendo publicaciones...</p>}
            {error && <p>Error: {error}</p>}
            {posts && posts.map(i => (
                <PostItem 
                    key={i.id} 
                    id={i.id}
                    author={i.owner} 
                    image={i.image}
                    tags={i.tags}
                    content={i.text}
                    link={i.link}
                    likes={i.likes}
                    publishDate={i.publishDate}
                />
            ))}
        </div>
    )
}

export default Posts;
