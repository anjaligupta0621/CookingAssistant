import React, { useEffect, useState, useCallback } from "react"
import axios from "axios";
import ReactPlayer from "react-player"
import { Box, Stack, Table, Typography } from '@mui/material';
import { Sidebar, AudioListener} from './';
import { useSpeechSynthesis } from 'react-speech-kit';
import Speech from 'react-speech';
const AVPlayer = (args) => {
 
  const [isPlaying, setIsPlaying] = useState(args.playing) // handling state of play/pause of player
  const [isTimestamps, setIsTimestamps] = useState(args.timestamps)
  const [isRewind, setIsRewind] = useState(args.rewind)
  const [isIngredients, setIsIngredients] = useState(args.ingred)
  const playerRef = React.useRef(null) // reference that needs to be passed to react player
  const divRef = React.useRef(null)
  const [videoID, setVideoID] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Video QA");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [splword, setSplword] = useState("");
  const {speak} = useSpeechSynthesis();
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

    // Api for ingredients is being called here
    // Output stored in ingredients use state
    axios.post('/api/getingredients', data, {headers:{"Content-Type" : "application/json"}})
      .then(response => {
        setIngredients(response.data.description);
        console.log(response.data.description);
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

  const [dataChild, setdataChild] = useState(0);
  const onKeyPressHandler = useCallback(
    () => setIsPlaying(isPlaying => !isPlaying),
    [setIsPlaying]
  )

  const onPlayHandler = () => {
    setIsPlaying(true);
  }

  const onPauseHandler = () => {
    setIsPlaying(false);
  }

  // function callBack(childData) {
  //   console.log("Entering callback"+childData);
  //   setdataChild(childData);
  // }

  // Handles the jumping timestamps, navigation and titration functionality
  const handleJump = (childData, type) => {
    if (type == "jump") {
        if (playerRef.current) {
          // Jump to 30 seconds
          console.log("AVplayer time checking "+childData);
          playerRef.current.seekTo(childData);
        }
    }
    else if (type == "back") {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - childData);
    }
    else if (type == "forward") {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + childData);
    }
    else {
      // Handles the titration functionality 
      for(var i = 0; i < ingredients.length; i++){
          console.log('$$$$$$$$$Entering the ingredients for loop', ingredients[i].slice(0,6).toLowerCase())
          if (type.toLowerCase() === ingredients[i].slice(0,type.length).toLowerCase()) {
            console.log("$$$$$$$$$$%%%%%%",ingredients[i])
            setSplword(ingredients[i])
            speak({text: ingredients[i]})
            console.log('Getting splword', splword);
          }
        }
    }
  }
  
  const videoIDForIngredients = videoID;
  const handleKeypress = event => {
    if (event.key === "p") {
      // onKeyPressHandler()
      onPlayHandler();
    }
    if (event.key === "q") {
      // onKeyPressHandler()
      onPauseHandler();
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
                timestamps = {isTimestamps || false}
                ingred = {isIngredients || false}
                loop={args.loop || undefined}
                // controls={args.controls || undefined}
                controls={true}
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
                  <AudioListener handleCallBack = {handleJump} ingredients/>
                </div>
              <div>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {splword}
                </Typography>
              </div>
                
                
                <br></br>
              {(isIngredients) ?
                <Table style={{border: '2px solid forestgreen', width: '800px', height: '100px'}} variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                  {ingredients.map((item, idx) => (
                  // <Box key={idx}>
                  //   <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                  <tr style={{border: '2px solid pink'}} > <td style={{textalign: 'center'}}>{item} </td></tr>
                  // </Typography>
                  // </Box>
                ))}
                </Table> : ''
              } 
            </div>
        </div>
      </Box>
    </Stack>
  )
}

export default AVPlayer
