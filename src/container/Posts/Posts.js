import React from 'react';

import './Posts.scss';
import PostItem from '../../components/PostItem/PostItem';

function Posts(props) {

    return (
        <div className="Posts">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            
        </div>
    )
}

export default Posts;
