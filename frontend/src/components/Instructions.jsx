import React from 'react';
import {useEffect, useState} from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { Sidebar } from '.';

function Instructions(props) {
    const [selectedCategory, setSelectedCategory] = useState("Instructions");

    return (            
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </Box>
            <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                <Typography variant="h4" alignSelf={'center'} fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {selectedCategory}
                </Typography>
                <Typography variant="h5" mb={2} sx={{ color: "white" }}>
                    Welcome to Cooking Assist!
                </Typography>
                <Typography variant="h6" mb={2} sx={{ color: "white" }}>
                    Everyone loves to eat delicious food. Some of us love to try out different recipes for
                    making food. And for that, most of us rely on YouTube for providing us with good recipe
                    videos. Although, it is a big pain point that we have to touch our devices to play and 
                    pause the video so many times, or rewind to look for the quantity of a particular 
                    ingredient while we are cooking. While cooking, our hands are often occupied with 
                    other stuff, which prevents us from multi-tasking. If only, there was a way to 
                    revolutionize the way we cook.
                    <br />
                    Well, it turns out there is a way if we use this application. Cooking Assist is a web 
                    application that helps you to cook your favorite recipes by providing you with a video 
                    feed of the recipe and a voice assistant that can help you talk to the video while 
                    cooking your favourite dish. The application allows its users to interact with the 
                    YouTube video they are watching using Speech. 
                    <br />
                    With this application, users can interact with the YouTube video more naturally by 
                    just giving it speech commands. The functionalities of the application include 
                    playing/pausing the video, displaying ingredients of a video, displaying and speaking 
                    the amount of a particular ingredient in the recipe, jumping to a particular timestamp
                     in the video, and navigating backwards and forward in the video. All of these are 
                     included to make the process of cooking more natural for the users. 
                     Moreover, there are features like search bar and instructions page so that it is 
                     convenient for the users to use the application.
                </Typography>
                <Typography variant="h6" mb={2} sx={{ color: "white" }}>
                    Below are the instructions that you can follow for a smooth experience.
                    <br />
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                        1. Type the title of whatever video you want to view in the Search Bar.
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    2. For enabling voice assistant, click on the video that you need to watch
                        and press the 'Ask' button on the screen. You can also press the
                        'a' key on your keyboard.
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    3. Once you click on the 'Ask' button, the application will start listening
                       to your voice. You can then ask questions or give instructions to the 
                       application.
                    </Typography>
                    <Typography variant="h6" mb={2} ml={4} sx={{ color: "white" }}>
                    4. Say "hello" before every instruction or question.
                    </Typography>

                    Below are some of the features that you can utilize for a better experience.
                    <br />
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    1. You can play the video using speech. For example, <br />
                        <Typography variant="h6" ml={8} sx={{ color: "white" }}>
                        "Hello, play the video" <br />
                        "Hello, play" <br />
                        </Typography>
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    2. You can pause the video using speech. For example, <br />
                        <Typography variant="h6" ml={8} sx={{ color: "white" }}>
                        "Hello, pause the video" <br />
                        "Hello, pause" <br />
                        </Typography>
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    3. You can ask the application to list the ingredients of the recipe. 
                        For example, <br />
                        <Typography variant="h6" ml={8} sx={{ color: "white" }}>
                        "Hello, list the ingredients" <br />
                        "Hello, list ingredients" <br />
                        "Hello, list the ingredients of the recipe" <br />
                        </Typography>
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    4. You can ask the application the exact titration of a particular ingredient
                        in the recipe. For example, <br />
                        <Typography variant="h6" ml={8} sx={{ color: "white" }}>
                        "Hello, how much salt is required?" <br />
                        "Hello, how much coriander seeds?" <br />
                        </Typography>
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    5. You can ask the application to navigate to a particular timestamp. For 
                        example, <br />
                        <Typography variant="h6" ml={8} sx={{ color: "white" }}>
                        "Hello, jump to 2:15 (two fifteen)" <br />
                        "Hello, jump to 4:30 (four thirty)" <br />
                        </Typography>
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    6. You can ask the application to move forward/backward by 30 seconds. For 
                        example, <br />
                        <Typography variant="h6" ml={8} sx={{ color: "white" }}>
                        "Hello, move forward" <br />
                        "Hello, move back" <br />
                        </Typography>
                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    7. You can ask the application to stop listening to your voice. For 
                        example, <br />
                        <Typography variant="h6" ml={8} sx={{ color: "white" }}>
                        "Hello, Stop listening" <br />
                        You can also press 'Stop' button.
                        </Typography>

                    </Typography>
                    <Typography variant="h6" ml={4} sx={{ color: "white" }}>
                    8. You can reset whatever you have said by clicking on the 'Reset' button.
                    </Typography>
                </Typography>

            </Box>
        </Stack>
    )
}

export default Instructions;