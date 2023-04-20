import { Stack, Box, Grid } from "@mui/material";
import { Loader, VideoCard,  } from "./";
import SearchBar from './SearchBar';

const Videos = ({ videoData, direction, feedType}) => {

  console.log(feedType)
  if(!videoData?.length) return <Loader />;

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videoData.map((item, idx) => (
        <Box key={idx}>
          <VideoCard video={item.video_url} thumbnail={item.thumbnail_url} title={item.video_title} video_id={item.video_id}/>
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;