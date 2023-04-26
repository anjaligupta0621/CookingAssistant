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
                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                    Copyright © 2023 UFL
                </Typography>
            </Box>
            <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {selectedCategory}
                </Typography>
            </Box>
        </Stack>
    )
}

export default Instructions;