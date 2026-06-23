import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';
import { fetchFromApi } from "../utils/fetchFromApi";
import { Videos, ChannelCard } from "./"

export default function ChannelDetail() {
    const { id } = useParams();
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromApi(`channel/about?id=${id}`, `${id}-details`)
            .then((data) => setChannelDetail(data?.items?.[0]));

        fetchFromApi(`channel/videos?id=${id}`, `${id}-videos`)
            .then((data) => setVideos(data?.items));
    }, [id])

    return (
        <>
            {/* {channelDetail && <ChannelCard channelDetail={channelDetail} />}
            <Box p={2} display="flex" ms="3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Videos videos={videos} />
            </Box> */}
            <Box sx={{ minHeight: "95vh" }}>
                <Box>
                    <div style={{
                        background: ' #00EEF7',
                        background: 'linear-gradient(90deg, rgba(0, 238, 247, 1) 0%, rgba(206, 3, 184, 1) 100%)',
                        zIndex: 10, height: '220px'
                    }} />
                    <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
                </Box>
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videos} />

            </Box>
        </>
    )
}