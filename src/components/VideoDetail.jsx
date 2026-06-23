import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { Typography, Box, Stack, Button } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import { Videos } from "./"
import { fetchFromApi } from "../utils/fetchFromApi"

export default function VideoDetail() {
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchFromApi(`video/info?id=${id}`, `video-${id}`)
            .then((data) => setVideoDetail(data?.items?.[0]));

        fetchFromApi(`related?id=${id}`, `related-${id}`)
            .then((data) => setRelatedVideos(data?.items));
    }, [id]);

    if (!videoDetail) return null;
    console.log(videoDetail);
    const { title, channelId, channelTitle, likeCount, description } = videoDetail;

    return (
        <Box sx={{ display: 'flex', overflowX: 'hidden', width: '100%' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} width="100%">

                {/* Main video - 75% width */}
                <Box sx={{ flex: 3, minWidth: 0 }}>
                    <Box sx={{ position: 'sticky', top: '86px' }}>

                        <Box sx={{
                            position: 'relative',
                            paddingTop: '56.25%',
                            width: '100%',
                            '& iframe': {
                                position: 'absolute',
                                top: 0, left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none',
                            }
                        }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${id}?playsinline=0`}
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                }}
                            />
                        </Box>

                        <Typography variant="h5" fontWeight="bold" p={3} sx={{ color: "#fff" }}>
                            {title}
                        </Typography>

                        <Stack direction="row" sx={{ color: "#fff", justifyContent: "space-between" }} py={1}>

                            {/* Channel info - only this is a link */}
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                                    {channelTitle}
                                    <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
                                </Typography>
                            </Link>

                            <Typography variant="body1" sx={{ color: "#fff", marginRight: '10px' }} >
                                Likes: {likeCount}
                            </Typography>

                        </Stack>

                        <Button
                            variant="outlined"
                            onClick={() => setShow(!show)}
                            sx={{ mb: 2, mt: 1, color: '#fff', borderColor: '#fff' }}
                        >
                            {show ? "Hide Description" : "Show Description"}
                        </Button>
                        {show && (
                            <Typography variant="body1" sx={{ color: "#fff", mt: 2, px: 2, width: { md: '80 %' } }}>
                                {description}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Related videos - 25% width, no extra padding on mobile */}
                <Box sx={{
                    flex: { md: 1 },
                    width: { xs: '100%', md: 'auto' },
                    maxHeight: { md: '95vh' },
                    overflowY: { md: 'auto' },


                    py: { xs: 2, md: 2 },  // ✅ removes vertical gap on mobile
                }}>
                    <Videos videos={relatedVideos} direction="column" />
                </Box>

            </Stack>
        </Box>
    );
}