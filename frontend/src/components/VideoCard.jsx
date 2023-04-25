import {useEffect, useState} from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Loader from './Loader';
import { useNavigate } from "react-router-dom"

const VideoCard = ({video, thumbnail, title, video_id}) => {
    console.log(video)
    // const [videoMetadata, setvideoMetadata] = useState({});
    // const [video_url] = useState(video)
    const navigate = useNavigate();
    // var video_id = video_url.split('v=')[1];
    // var ampersandPosition = video_id.indexOf('&');
    // if(ampersandPosition !== -1) {
    //     video_id = video_id.substring(0, ampersandPosition);
    // }

    // useEffect(() => {
    //     setvideoMetadata({});
    //     // Open API to fetch the thumbnail and title of a particular video -> metadata setup
    //     fetch(`https://noembed.com/embed?dataType=json&url=${video_url}`)
    //     .then(res => res.json())
    //     .then((data) => {
    //         console.log(data.title)
    //         setvideoMetadata({thumbnail_url: `https://img.youtube.com/vi/${video_id}/sddefault.jpg`, video_title: data.title})
    //     })
    // }, [setvideoMetadata]);

    if (thumbnail === '' || title === '') return <Loader />

    function onVideoCardClick() {
        // console.log(video)
        // var video_id = video.split('v=')[1];
        // var ampersandPosition = video_id.indexOf('&');
        // if(ampersandPosition !== -1) {
        //     video_id = video_id.substring(0, ampersandPosition);
        // }
        navigate('/avplayer/' + video_id);
    }

    return (
        <Card onClick={onVideoCardClick} sx={{ width: { xs: '100%', sm: '420px', md: '420px'}, height: 350, boxShadow: "none", borderRadius: 0 }}>
            <CardMedia image={thumbnail} sx={{ width: { xs: '100%', sm: '420px'}, height: 350 }} />
            <CardContent sx={{ backgroundColor: "#1E1E1E", height: '308px' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                    {title}
                </Typography>
            </CardContent>
        </Card>
      );
}

export default VideoCard;