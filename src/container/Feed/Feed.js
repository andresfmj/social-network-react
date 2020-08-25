import React, { useState, useEffect } from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';

import Posts from '../Posts/Posts';
import { request } from '../../helpers/request';
import { API_URL } from '../../helpers/constants';

function Feed(props) {
    const [tags, setTags] = useState([])
    const [loadingTags, setLoadingTags] = useState(false)
    const [errorTags, setErrorTags] = useState('')
    const [pagination, setPagination] = useState(null)

    const fetchTags = async (pagi) => {
        setLoadingTags(true)
        setErrorTags('')
        const response = await request(`${API_URL}/tag?limit=25&page=${pagi ? pagi.page : 0}`, 'GET', null)
        if (response.ok) {
            const data = await response.json()
            if (data.data.length > 0) {
                const updatedTags = [...tags]
                data.data.forEach(v => {
                    updatedTags.push(v)
                })
                setTags(updatedTags)
                setPagination({ 
                    limit: data.limit,
                    offset: data.offset,
                    page: data.page, 
                    total: data.total 
                })
                setLoadingTags(false)
                setErrorTags('')
            } else {
                setErrorTags('No Tags added')
                setLoadingTags(false)
            }
        } else {
            setErrorTags(`${response.status} ${response.statusText}`)
            setLoadingTags(false)
        }
    }


    const loadedMoreTagsHandler = () => {
        const updatedPagination = {
            ...pagination,
            page: pagination.page + 1
        }
        fetchTags(updatedPagination)
    }

    useEffect(() => {
        fetchTags(pagination)
    }, [])

    return (
        <React.Fragment>
            <div style={{ flex: 1 }}>
                <p></p>
            </div>
            <Switch>
                <Route exact path='/posts' component={Posts} />
                <Route exact path='/tag/:tagTitle/post' component={Posts} />
                <Route exact path='/user/:authorId/post' component={Posts} />
            </Switch>
            <div className="Aside" style={{ flex: 1 }}>
                <div className="Aside__tags">
                    <h2>Tags</h2>
                    {tags && (
                        <ul>
                            {tags.map((item, _i) => (
                                <li key={_i}>
                                    <Link to={`/tag/${encodeURIComponent(item).replace('%20', '+')}/post`}>{`#${item}`}</Link>
                                </li>
                            ))}
                            {pagination && <li><button onClick={loadedMoreTagsHandler}>{((pagination.limit + pagination.offset) < pagination.total) ? '-cargar mas-' : null}</button></li>}
                        </ul>
                    )}
                    {loadingTags && <p>Cargando Tags...</p>}
                    {errorTags && <p>{errorTags}</p>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Feed);
