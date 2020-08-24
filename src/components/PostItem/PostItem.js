import React from 'react';

import './PostItem.scss';

function PostItem({ id, author, image, tags, content, link, likes, publishDate }) {

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
            </div>
            <div className="Post-item-stats">
                <p className='text-center'>(icon) {`${likes} likes`}</p>
                <p className='text-center'>{`published at ${publishDate}`}</p>
            </div>
            <div className="Post-item-actions">
                <p><a href={`/post/${id}/comments`}>Show Comments</a></p>
            </div>
        </div>
    )
}

export default PostItem;
