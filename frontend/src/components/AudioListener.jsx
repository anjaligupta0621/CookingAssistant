import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./Audio.css"

const AudioListener = () => {
 const commands = [] // can be used to return trained responses if we want, otherwise kept blank
 const {
   transcript,
   finalTranscript,
   resetTranscript,
 } = useSpeechRecognition({ commands });

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

  window.removeEventListener("keypress", handleKeypress)
  window.addEventListener("keypress", handleKeypress)

  useEffect(() => {
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
          if (words[i] === "Pause" ||  words[i] === "pause"){
             console.log("Pause from AudioListener");
             window.dispatchEvent(new KeyboardEvent("keypress", {"key": "p"}));
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
 
 return (
    <div id="outer">
     <div className="inner">
       <div>
          <button type="button" onClick={listenContinuously}>Ask</button>
          <button type="button" onClick={resetTranscript}>Reset</button>
       </div>
     </div>
     <div className="inner">
       <span className='spanColor'>{transcript}</span>
     </div>
   </div>
 );
};

export default AudioListener;