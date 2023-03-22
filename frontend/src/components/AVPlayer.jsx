import React, { useEffect, useState, useCallback } from "react"
import axios from "axios";
import ReactPlayer from "react-player"
import { Box, Stack, Typography } from '@mui/material';
import { Sidebar, AudioListener} from './';

const AVPlayer = (args) => {
  const [isPlaying, setIsPlaying] = useState(args.playing) // handling state of play/pause of player
  const [isIngredients, setIsIngredients] = useState(args.ingred)
  const playerRef = React.useRef(null) // reference that needs to be passed to react player
  const divRef = React.useRef(null)
  const [videoID, setVideoID] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Video QA");
  // const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  // Handle events
  useEffect(() => {
    divRef.current?.focus()

    window.removeEventListener("keypress", handleKeypress)
    window.addEventListener("keypress", handleKeypress)

    var parts = window.location.href.split('/');
    console.log(parts)
    var lastSegment = parts.pop() || parts.pop(); 
    setVideoID(lastSegment)
    console.log("Video ID Set:", lastSegment);

    let data = JSON.stringify(
      {
        'id': lastSegment
      }
    )

    axios.post('/api/getingredients', data, {headers:{"Content-Type" : "application/json"}})
      .then(response => {
        setIngredients(response.data.description);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })

    // fetch('/api/getingredients', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({videoID})
    // })
    // .then(response => {
    //   console.log("Body: ");
    //   console.log(response);
    // })
    // .catch(error => console.log(error))
  }, [])

  const onKeyPressHandler = useCallback(
    () => setIsPlaying(isPlaying => !isPlaying),
    [setIsPlaying]
  )

  const handleKeypress = event => {
    if (event.key === "p") {
      onKeyPressHandler()
    }
    if (event.key === "a") {
      // Video needs to pause and frame captured when question is being asked
      setIsPlaying(false)
    }
    if (event.key === "i") {
      // Video needs to pause and frame captured when question is being asked
      setIsIngredients(true)
    }
  }

  const onVideoPlay = () => {
    console.log("Inside onVideoPlay and value of isPlaying is")
    console.log(isPlaying)
  }

  const onVideoPause = () => {
    console.log("Inside onVideoPause  and value of isPlaying is")
    console.log(isPlaying)
  }

  const events = [
    "onStart", "onPlay", "onProgress", "onDuration", "onPause",
    "onBuffer", "onBufferEnd", "onSeek", "onEnded", "onError"
  ]
  let options = {
  "events": events,
  "progress_interval": 1000
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
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
            {selectedCategory}
        </Typography>
        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '25px'}}>
            <div ref={divRef} id="container" style={{ height: "400px" }}>
                <ReactPlayer
                ref={playerRef}
                url={"https://www.youtube.com/watch?v=" + videoID}
                onPlay={onVideoPlay}
                onPause={onVideoPause}
                options={options}
                width={args.width || undefined}
                height={args.height || undefined}
                playing={isPlaying || false}
                ingred = {isIngredients || false}
                loop={args.loop || undefined}
                controls={args.controls || undefined}
                light={args.light || undefined}
                volume={args.volume}
                muted={args.muted || undefined}
                playbackRate={args.playbackRate}
                progressInterval={args.progressInterval}
                playsinline={args.playInline || undefined}
                config={args.config || undefined}
                />
                <br></br>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '25px'}}>
                  <AudioListener />
                </div>
                {/* <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {ingredients}
                </Typography> */}
              {(isIngredients) ?
                (<Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {ingredients}
                </Typography>) : ''
                }
            </div>
        </div>
      </Box>
    </Stack>
  )
}

export default AVPlayer
