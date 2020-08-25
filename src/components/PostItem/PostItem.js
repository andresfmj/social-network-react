import React, { useState, useEffect } from 'react';

import './PostItem.scss';

import Modal from '../Modal/Modal';
import { request } from '../../helpers/request';
import { API_URL } from '../../helpers/constants';

function PostItem({ id, author, image, tags, content, link, likes, publishDate }) {
    const [toggleModal, setToggleModal] = useState(false)
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [errorComments, setErrorComments] = useState('')

    const toggleModalHandler = () => {
        console.log('toggle modal')
        setToggleModal(!toggleModal)
    }

    const fetchComments = async () => {
        setLoadingComments(true)
        setErrorComments('')
        setComments([])
        const response = await request(`${API_URL}/post/${id}/comment`, 'GET', null)
        const data = await response.json()
        if (response.ok) {
            if (data.data.length > 0) {
                setComments(data.data)
            } else {
                setErrorComments('No comments posted yet')
            }
            setLoadingComments(false)
        } else {
            setErrorComments(`${response.status} ${response.statusText}`)
            setLoadingComments(false)
        }
    }

    useEffect(() => {
        if (toggleModal) {
            fetchComments()
        }

    }, [toggleModal])


    return (
        <div className="Post-item">
            <header>
                <h2>
                    <a href={`/user/${author.id}/post`}>{`${author.firstName} ${author.lastName}`}</a>
                </h2>
            </header>
            <div className="Post-item-content">
                <img className='img-rounded' src={image} alt="" />
                <div className="Post-item-hashtags">
                    <ul>
                        {
                            tags && tags.length > 0 && tags.map((t, _i) => (
                                <li key={_i}><a href={encodeURIComponent(`/tag/${t}/post`).replace('%20', '+')}>{`#${t}`}</a></li>
                            ))
                        }
                    </ul>
                </div>
                <p>{content}</p>
                <p className='Post-item-link'><a href={link}>{link}</a></p>
            </div>
            <div className="Post-item-stats">
                <p className='text-center'>(icon) {`${likes} likes`}</p>
                <p className='text-center'>{`published at ${publishDate}`}</p>
            </div>
            <div className="Post-item-actions">
                <p><button href={`/post/${id}/comments`} onClick={toggleModalHandler}>Show Comments</button></p>
            </div>
            <Modal modalIsOpen={toggleModal} toggleModal={toggleModalHandler}>
                <h2>Comments</h2>
                {loadingComments && <p>Loading comments...</p>}
                {errorComments && <p>{errorComments}</p>}
                <ul className='Post-comments'>
                    {comments && comments.map(i => (
                        <li key={i.id}>
                            <p>{i.message}</p>
                            <p className='text-right'>{i.publishDate}</p>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    )
}

export default PostItem;
