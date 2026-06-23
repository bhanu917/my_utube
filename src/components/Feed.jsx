import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from '@mui/material'
import { Sidebar, Videos } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
export default function Feed() {
    const [selectedCategory, setSelectedCategory] = useState('New');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromApi(`search?query=${selectedCategory}`, selectedCategory)
            .then((data) => {
                const sorted = [...(data.items || [])].sort((a, b) => {
                    if (a.type === "channel" && b.type !== "channel") return -1;
                    if (a.type !== "channel" && b.type === "channel") return 1;
                    return 0;
                });
                setVideos(sorted);
            })
            .catch((err) => console.error(err));
    }, [selectedCategory]);


    return (
        <Stack sx={{ flexDirection: { sx: "column", md: "row" }, mt: 2 }}>
            <Box sx={{ height: { sx: "auto", md: "90vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff" }}>
                    copyright 2026 react developer
                </Typography>
            </Box>

            <Box p={2} sx={{ overflow: "auto", height: "91vh", flex: 2 }}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {selectedCategory}{" "}
                    <span style={{ color: "#F31503" }}>
                        videos
                    </span>
                </Typography>
                <Videos videos={videos} />
            </Box>
        </Stack >
    )
}