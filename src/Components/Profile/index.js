import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../assets/avatar.png';
import { useFeed } from "../../hooks/feed";

import {
    Container,
    Img,
    Username,
    Name
} from './styles';

const Profile = ({ direction, username, name, usidebar = false, img, isOwner = false }) => {

    const { setFilter } = useFeed();

    const filterCountries = (selected) => {
        setFilter(selected);
    }

    return (
        <Container direction={direction} usidebar={usidebar} onClick={(e) => filterCountries(username)}>
                
                {img ? ( //<Link to={`/profile/${username}`}>
                    <Img src={img} alt="avatar" usidebar={usidebar} isOwner={isOwner} />
                ) : (
                    <Img src={avatar} alt="avatar" usidebar={usidebar} isOwner={isOwner} />
                )}
                
            <div>
                
                {username && <Username usidebar={usidebar}>{username}</Username> //to={`/profile/${username}`}
                }
                
                {name && <Name>{name}</Name>}
            </div>
        </Container>
    );
}

export default React.memo(Profile);