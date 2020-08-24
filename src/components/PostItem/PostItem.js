import React from 'react';

import './PostItem.scss';

function PostItem({ author, image, tags, content, likes, date, comments }) {

    return (
        <div className="Post-item">
            <header>
                <h2>Author Name</h2>
            </header>
            <div className="Post-item-content">
                <img className='img-rounded' src="https://via.placeholder.com/300x380.png?text=Image+Post" alt="alternative text" />
                <div className="Post-item-hashtags">
                    <ul>
                        <li>#animal</li>
                        <li>#doglover</li>
                        <li>#retriever</li>
                    </ul>
                </div>
                <p>Content for the post is showed here...</p>
            </div>
            <div className="Post-item-stats">
                <p>(icon) 11 likes</p>
                <p>published at (date)</p>
            </div>
            <div className="Post-item-actions">
                <ul>
                    <li>Comments</li>
                </ul>
            </div>
        </div>
    )
}

export default PostItem;
