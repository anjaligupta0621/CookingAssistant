import {useEffect, useState} from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import axios from 'axios'
import { Sidebar, Videos } from './';

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("Video QA");
    const [videos, setVideos] = useState(null);
    const [videoData, setVideoData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const [searchData, setsearchData] = useState([]);

    useEffect(() => {
        setVideos(null);
        axios.get('/api/yturls')
        .then(response => {
            setVideos(response.data.url);
            // const d = response.data.url;
            console.log("HELLO: ", response.data.url);
            for (let i = 0; i < response.data.url.length; i++) {
                const video_url = response.data.url[i];
                fetch(`https://noembed.com/embed?dataType=json&url=${video_url}`)
                .then(res => res.json())
                .then((data) => {
                    console.log("video title: ", data.title)
                    var video_id = video_url.split('v=')[1];
                    var ampersandPosition = video_id.indexOf('&');
                    if(ampersandPosition !== -1) {
                        video_id = video_id.substring(0, ampersandPosition);
                    }
                    console.log("video id: ", video_id);
                    // setvideoMetadata({thumbnail_url: `https://img.youtube.com/vi/${video_id}/sddefault.jpg`, video_title: data.title})
                    setsearchData(searchData => [...searchData, {video_id: video_id, video_url: video_url, thumbnail_url: `https://img.youtube.com/vi/${video_id}/sddefault.jpg`, video_title: data.title}]);
                    setVideoData(videoData => [...videoData, {video_id: video_id, video_url: video_url, thumbnail_url: `https://img.youtube.com/vi/${video_id}/sddefault.jpg`, video_title: data.title}]);
                })
            }
        }).then(() => {
            console.log("videoData: ", videoData);
        })
        .catch(error => {
        console.log(error)
        })

    }, [selectedCategory, setVideos]);

    const onChangeSearch = (e) => {
        setSearchInput(e.target.value);
        console.log("searchTerm: ", searchInput);

        let value = e.target.value.toLowerCase();

        let result = [];
        result = videoData.filter((data) => {
            return data.video_title.toLowerCase().search(value) !== -1;
        });
        setsearchData(result);
        
    }

    return (            
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                    Copyright © 2023 UFL
                </Typography>
            </Box>
            <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                >
                <Grid item xs={6}>
                    <div className='search-bar'>
                        <input
                            type="search"
                            placeholder="Search here"
                            onChange={onChangeSearch}
                            value={searchInput} />
                    </div>
                </Grid>   
            </Grid> 
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {selectedCategory}
                </Typography>
                <Videos videoData={searchData}/>
            </Box>
        </Stack>
    )
}

export default Feed;