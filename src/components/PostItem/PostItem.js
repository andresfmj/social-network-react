import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './PostItem.scss';

import Modal from '../Modal/Modal';
import { request } from '../../helpers/request';
import ProfileInfo from '../ProfileInfo/ProfileInfo';

function PostItem({ id, author, image, tags, content, link, likes, publishDate }) {
    const [toggleModal, setToggleModal] = useState(false)
    const [toggleProfileModal, setToggleProfileModal] = useState(false)
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [errorComments, setErrorComments] = useState('')

    const toggleModalHandler = (label) => {
        if (label === 'profile') {
            setToggleProfileModal(!toggleProfileModal)
        } else {
            setToggleModal(!toggleModal)
        }
    }

    const fetchComments = async () => {
        setLoadingComments(true)
        setErrorComments('')
        setComments([])
        const response = await request(`/post/${id}/comment`, 'GET', null)
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

    const profileClickedHandler = () => {
        setToggleProfileModal(!toggleProfileModal)
    }

    useEffect(() => {
        fetchComments()
    }, [])


    return (
        <div className="Post-item">
            <header>
                <h2>
                    <button className='btn' onClick={profileClickedHandler}>{`${author.firstName} ${author.lastName}`}</button> <span className='text-small text-muted'><Link to={`/user/${author.id}/post`}>ver posts del usuario</Link></span>
                </h2>
            </header>
            <div className="Post-item-content">
                <Link to={`/post/${id}`}>
                    <img className='img-rounded' src={image} alt="" />
                </Link>
                <div className="Post-item-hashtags">
                    <ul>
                        {
                            tags && tags.length > 0 && tags.map((t, _i) => (
                                <li key={_i}>
                                    <Link to={`/tag/${encodeURIComponent(t).replace('%20', '+')}/post`}>{`#${t}`}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <p>{content}</p>
                <p className='Post-item-link'><a href={link}>{link}</a></p>
            </div>
            <div className="Post-item-stats">
                <p className='text-right'><span role='img' aria-label='likeIcon'>💙</span> {`${likes} me gusta`}</p>
                <p className='text-right'>{`publicado ${publishDate}`}</p>
            </div>
            <div className="Post-item-actions">
                <button onClick={() => toggleModalHandler('comments')}>Mostrar comentarios</button> <span>{comments.length > 0 ? `${comments.length} comentario(s)` : ''}</span>
            </div>
            <Modal modalIsOpen={toggleModal} toggleModal={() => toggleModalHandler('comments')}>
                <h2>Comentarios</h2>
                {loadingComments && <p>Cargando comentarios...</p>}
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
            <Modal modalIsOpen={toggleProfileModal} toggleModal={() => toggleModalHandler('profile')}>
                <h2>Perfil de Usuario</h2>
                <ProfileInfo profileUser={author} />
            </Modal>
        </div>
    )
}

export default PostItem;
