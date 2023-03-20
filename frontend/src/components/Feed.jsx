import {useEffect, useState} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios'
import { Sidebar, Videos } from './';

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("Video QA");
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        setVideos(null);
        axios.get('/api/yturls')
        .then(response => {
            setVideos(response.data.url);
        }).catch(error => {
        console.log(error)
        })

    }, [selectedCategory, setVideos]);

    return (
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                    Copyright © 2023 UFL
                </Typography>
            </Box>
            <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {selectedCategory}
                </Typography>
                <Videos videos={videos}/>
            </Box>
        </Stack>
    )
}

export default Feed;