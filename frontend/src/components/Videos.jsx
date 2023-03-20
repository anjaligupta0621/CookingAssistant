import React from 'react'
import { Stack, Box } from "@mui/material";
import { Loader, VideoCard,  } from "./";

const Videos = ({ videos, direction, feedType}) => {
  console.log(feedType)
  if(!videos?.length) return <Loader />;
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          <VideoCard video={item}/>
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;