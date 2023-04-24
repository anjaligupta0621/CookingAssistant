import React, { useEffect, useState} from 'react';
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { Typography, Box } from '@mui/material';
import "./Audio.css"
// import { useSpeechSynthesis } from 'react-speech-kit';
// import Speech from 'react-speech';

const AudioListener = (props) => {
//   const playerRef = React.useRef(null);
//  const [videoID, setVideoID] = useState("")
//  const [ingredients, setIngredients] = useState([]);
//  const [splword, setSplword] = useState("");
 const commands = [] // can be used to return trained responses if we want, otherwise kept blank
 const {
   transcript,
   finalTranscript,
   resetTranscript,
 } = useSpeechRecognition({ commands });
//  const {speak} = useSpeechSynthesis();

 const listenContinuously = () => {
  SpeechRecognition.startListening({
    continuous: true,
    language: 'en-GB',
  });
};

 const handleKeypress = event => {
    if (event.key === "a") {
      // start audio recording
      resetTranscript()
      listenContinuously()
    }
    if (event.key === "s") {
      // stop audio recording
      SpeechRecognition.stopListening()
    }
  }

  const stopListen = () => {
    SpeechRecognition.stopListening();
  }

  window.removeEventListener("keypress", handleKeypress)
  window.addEventListener("keypress", handleKeypress)


  useEffect(() => {
    // var parts = window.location.href.split('/');
    // console.log(parts)
    // var lastSegment = parts.pop() || parts.pop(); 
    // setVideoID(lastSegment)
    // console.log("Video ID Set:", lastSegment);

    // let data = JSON.stringify(
    //   {
    //     'id': lastSegment
    //   }
    // )

    // axios.post('/api/getingredients', data, {headers:{"Content-Type" : "application/json"}})
    //   .then(response => {
    //     setIngredients(response.data.description);
    //     console.log(response.data.description);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    if (finalTranscript !== '') {
       // We can make API Call to backend or process the query to 
       // show/speech out a result 
       console.log('User Query->', finalTranscript);
       const words = finalTranscript.split(' ');
       if (words[0] === "Hello" || words[0] === "hello") {
        // Only take action when the first word is hello (keyword for now)
        for (var i = 0; i < words.length; i++){
          console.log(words[i]);
          if (words[i] === "Play" ||  words[i] === "play"){
            console.log("Play from AudioListener");
            window.dispatchEvent(new KeyboardEvent("keypress", {"key": "p"}));
          }
          else if (words[i] === "Pause" ||  words[i] === "pause"){
             console.log("Pause from AudioListener");
             window.dispatchEvent(new KeyboardEvent("keypress", {"key": "q"}));
          }
          else if (words[i] === "Ingredients" ||  words[i] === "ingredients"){
             console.log("GettingIngredients");
             window.dispatchEvent(new KeyboardEvent("keypress", {"key": "i"}));
          }
          else if (words[i - 1] === "much" ||  words[i - 1] === "Much") {
            var temp = 0;
            var type = words[i];
            {props.handleCallBack(temp, type)}
            // console.log('$$$$$$$$$Entering the how much', words[i - 1], words[i])
            // console.log(ingredients.length)
            // var finderString = words[i];
            // for(var i = 0; i < ingredients.length; i++){
            //   console.log('$$$$$$$$$Entering the ingredients for loop', ingredients[i].slice(0,6).toLowerCase())
            //   if (finderString.toLowerCase() === ingredients[i].slice(0,finderString.length).toLowerCase()){
            //     console.log("$$$$$$$$$$%%%%%%",ingredients[i])
            //     setSplword(ingredients[i])
            //     speak({text: ingredients[i]})
                
            //     console.log('Getting splword', splword);
            //   }
            // }
            // console.log("Testing the titration if condition");
            // console.log("printing the ingredients", ingredients);
            
          }
          else if (words[i].includes(":") || words[i] === "back" ||  words[i] === "Back" || words[i] === "forward" ||  words[i] === "Forward") {
            var temp = 0;
            var type = "";
            if (words[i] === "back" ||  words[i] === "Back") {
              temp = 30
              type = "back"
              {props.handleCallBack(temp, type)}
            }
            else if (words[i] === "forward" ||  words[i] === "Forward") {
              temp = 30
              type = "forward"
              {props.handleCallBack(temp, type)}
            }
            else {
              const timeArray = words[i].split(":");
              temp = parseInt(timeArray[1]) + parseInt((60 * timeArray[0]))
              console.log("Minutes "+timeArray[0]);
              console.log("Seconds "+timeArray[1]);
              console.log("This is the timeArray "+timeArray);
              console.log("This is the time "+temp);
              console.log("This is the jumping timestamp");
              type = "jump"
              {props.handleCallBack(temp, type)}
            }
            // window.dispatchEvent(new KeyboardEvent("keypress", {"key": "t"}));
            }
          else if (words[i] === "stop" ||  words[i] === "Stop"){
          console.log("Stop Listening from AudioListener");
          window.dispatchEvent(new KeyboardEvent("keypress", {"key": "s"}));
          }
       }
       }
       
       // Resetting User Query(finalTranscript) after processing
       resetTranscript()
    }
  }, [finalTranscript, resetTranscript]);

 
 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }

//  const onSpeakHandler = (value) => {
//   speak({text: value});
//  }
 
 return (
    <div id="outer">
     <div className="inner">
       <div className='button-container'>
          <button className='buttons' type="button" onClick={listenContinuously}>Ask</button>
          <button className='buttons' type="button" onClick={resetTranscript}>Reset</button>
          <button className='buttons' type="button" onClick={stopListen}>Stop</button>
       </div>
     </div>
     <div className="inner">
       <span className='spanColor'>{transcript}</span>
     </div>
        {/* <div> */}
        {/* <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
            {splword}
        </Typography> */}

        {/* </div> */}
   
   </div>
   

 );
};

export default AudioListener;