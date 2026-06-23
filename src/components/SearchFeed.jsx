import React, { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material'
import { Videos } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
import { useParams } from "react-router-dom";

export default function SearchFeed() {
    const [videos, setVideos] = useState([]);
    const { searchterm } = useParams();

    useEffect(() => {
        fetchFromApi(`search?query=${searchterm}`, `search-${searchterm}`)
            .then((data) => {
                const sorted = [...(data.items || [])].sort((a, b) => {
                    if (a.type === "channel" && b.type !== "channel") return -1;
                    if (a.type !== "channel" && b.type === "channel") return 1;
                    return 0;
                });
                setVideos(sorted);
            }).then((data) => {
                console.log("raw search data:", data);
                // rest of your code
            })
            .catch((err) => console.error(err));
    }, [searchterm]);

    return (
        <Box p={2} sx={{ overflow: "auto", height: "91vh", flex: 2 }}>
            <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                Search results for: <span style={{ color: "#F31503" }}>{searchterm}</span>
            </Typography>
            <Videos videos={videos} />
        </Box>
    )
}