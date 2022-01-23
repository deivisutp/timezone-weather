import React, { useCallback, useState, useEffect, lazy, Suspense } from 'react';
import TimeAgo from 'react-timeago';
import englishString from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import { FaComment, FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ModalMoreOptions from '../Modal/ModalMoreOptions';
import Profile from '../Profile';

import api from '../../services/api';

import {
    Card,
    CardHeader,
    ContainerPhoto,
    PhotoCard,
    CardDetails,
    TimeAgo as StyleTimeAgo,
} from './styles';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

const CommentList = lazy(() => import('../CommentList'));

const formatter = buildFormatter(englishString);

const CardFeed = ({ feed }) => {

    const { isAuthor, isLiked, photo } = feed;
    const [like, setLike] = useState(isLiked); 

    const [commentsPhoto, setCommentsPhoto] = useState(photo.getComments);
    const [wheaterPhoto, setWheaterPhoto] = useState('');

    const [comment, setComment] = useState('');
    const [disabled, setDisabled] = useState(true);

    const getWheather = async (country_name) => { 
        const res = await api.get(`/countries/${country_name}`);
        if (res.status === 200) {
            setWheaterPhoto(res.data);
        }
    };

    useEffect(() => {
        getWheather(photo.country_name);
        if (comment.trim()) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [commentsPhoto,wheaterPhoto]);

    const toggleLike = useCallback(async (photo_id) => {
       //Adjust
       /*
        const res = await api.post(`/likes/${photo_id}`);

        if (res.status === 200) {
            setLike(!like);
        } else {
            toast.error("It was not possible to change it");
        } */
    }, [like]);

    const handleComment = useCallback((event) => {
        setComment(event.target.value);
    }, []);

    const handleSubmit = useCallback(async (event) => {
       //Adjust
       /*
        event.preventDefault();

        const res = await api.post(`comments/${photo.id}`, { body: comment });

        console.log(res);
        if (res.status === 200) {
            setCommentsPhoto((state) => [...state, res.data]);
            setComment('');
            setDisabled(true);
        } else {
            toast.error("It was not possible add a comment");
        } */
    }, [comment, photo]);

    return (
        <Card>
            <CardHeader>
                <ModalMoreOptions
                    isAuthor={isAuthor || false}
                    photo={photo}
                />
                <p style={{ fontWeight: "bold" }}>
                    {//photo.uploadedBy.username}
                    }
                    <span
                        style={{
                            marginLeft: 5,
                            fontWeight: "normal",
                            marginBottom: 10,
                            display: "inline-block",
                        }}
                    >
                        {photo.body}
                    </span>
                </p>
            </CardHeader>

            <ContainerPhoto>
                <PhotoCard src={photo.photo_url} alt={photo.photo_url} />
            </ContainerPhoto>

            <CardDetails>
                <Suspense fallback={<p>Loading...</p>}>
                    {commentsPhoto.length > 0 && (
                        <CommentList comments={commentsPhoto} />
                    )}
                </Suspense>
        
                {wheaterPhoto.length > 0 ? (
                   <div key={photo.country_name + 'wheatherid'} 
                        style={{
                            font: "small-caption",
                            fontSize: 12,
                            fontWeight: 100
                        }}
                        dangerouslySetInnerHTML={{__html: wheaterPhoto}}>
                   </div> 
                ) : (
                    <Spinner/>
                )}
      
                <StyleTimeAgo>
                   
                </StyleTimeAgo>

            </CardDetails>
        </Card>
    );
}

export default React.memo(CardFeed);