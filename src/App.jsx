// App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar, ChannelDetail, Feed, SearchFeed, VideoDetail } from "./components";

export default function App() {
    return (
        <BrowserRouter>
            <Box sx={{ backgroundColor: "#000" }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/video/:id" element={<VideoDetail />} />
                    <Route path="/Channel/:id" element={<ChannelDetail />} />
                    <Route path="/Search/:searchterm" element={<SearchFeed />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}
