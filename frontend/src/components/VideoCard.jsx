import {useEffect, useState} from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Loader from './Loader';
import { Link, useNavigate } from "react-router-dom"

const VideoCard = ({video, thumbnail, title, video_id}) => {
    console.log(video)

    const navigate = useNavigate();

    if (thumbnail === '' || title === '') return <Loader />

    function onVideoCardClick() {
        navigate('/avplayer/' + video_id);
    }

    return (
        <Card onClick={onVideoCardClick} sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
            <CardMedia image={thumbnail} sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} />
            <CardContent sx={{ backgroundColor: "#1E1E1E", height: '96px' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                    {title}
                </Typography>
            </CardContent>
        </Card>
      );
}

export default VideoCard;