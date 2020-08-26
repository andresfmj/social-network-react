import React, { useState, useEffect } from 'react';
import { 
    // useRouteMatch, 
    useParams, 
    // useHistory 
} from 'react-router';

import './Posts.scss';
import PostItem from '../../components/PostItem/PostItem';

import { request } from '../../helpers/request';
import Modal from '../../components/Modal/Modal';



function Posts(props) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [toggleModal, setToggleModal] = useState(false)
    const [token, setToken] = useState(null)
    const [tokenText, setTokenText] = useState('')

    // let urlMatch = useRouteMatch()
    let urlParams = useParams()
    // const history = useHistory()

    const fetchData = async () => {
        setLoading(true)
        setError('')
        setPosts([])
        let uri = ''
        if (urlParams.authorId) {
            uri = `/user/${urlParams.authorId}`
        } else if (urlParams.tagTitle) {
            uri = `/tag/${decodeURIComponent(urlParams.tagTitle).replace('+', '%20')}`
        }
        const urlToFetch = `${uri}/post?limit=5&page=0`;
        const req = await request(urlToFetch, 'GET', null)
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

    const modalTokenHandler = () => {
        setToggleModal(!toggleModal)
    }

    const updateTokenHandler = () => {
        if (tokenText !== '') {
            let date = new Date()
            let token = {
                appId: tokenText,
                expiresIn: date.setHours(date.getHours() + 1)
            }
            localStorage.setItem('token_appId', JSON.stringify(token))
            setToken(token)
            setToggleModal(false)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token_appId')) {
            modalTokenHandler()
        } else {
            fetchData()
            localStorage.getItem('token_appId')
        }
    }, [token])

    return (
        <React.Fragment>
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
            <Modal toggleModal={modalTokenHandler} modalIsOpen={toggleModal}>
                <h2 className='text-center'>Token de Autenticacion</h2>
                <div className="input-form">
                    <input type="text" placeholder='app-id de dummyapi' value={tokenText} onChange={(e) => setTokenText(e.target.value)} />
                    <button className='btn btn-primary' onClick={updateTokenHandler}>Guardar</button>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default Posts;
