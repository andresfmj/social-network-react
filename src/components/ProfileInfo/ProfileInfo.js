import React, { useEffect, useState } from 'react';

import "./ProfileInfo.scss";
import { request } from '../../helpers/request';


function ProfileInfo({ profileUser }) {
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchProfileFull = async () => {
        setLoading(true)
        setError('')
        setProfile([])
        const response = await request(`/user/${profile.id}`, 'GET', null)
        const data = await response.json()
        if (response.ok) {
            setProfile(data)
            setError('')
        } else {
            setError(`${response.status} ${response.statusText}`)
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchProfileFull()
    }, [])

    return (
        <div className="ProfileInfo">
            <div className="ProfileInfo-inner">
                <div className="Profile-image">
                    <img className='img-circle' src={profileUser.picture} alt={profileUser.id} />
                </div>
                <div className="Profile-description">
                    <header>
                        <h2>{`${profileUser.title}. ${profileUser.firstName} ${profileUser.lastName}`}</h2>
                    </header>
                    <div className="Profile-content">
                        <p><span>Gender:</span> {profileUser.gender}</p>
                        <p><span>Birthdate:</span> {profileUser.dateOfBirth}</p>
                        <p><span>Register Date:</span> {profileUser.registerDate}</p>
                        <hr />
                        <p><span>Email:</span> {profileUser.email}</p>
                        <p><span>Phone:</span> {profileUser.phone}</p>
                        <p><span>Address:</span> {`${profileUser.location.street}, ${profileUser.location.city} ${profileUser.location.country}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
