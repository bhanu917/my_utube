
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from '@mui/icons-material';
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

export default function VideoCard({ video: { videoId, title, thumbnail, channelTitle, channelId } }) {
    return (
        <Card id="vd" sx={{ width: { xs: "100%", sm: "300px", md: "270px" }, boxShadow: "none", borderRadius: 0 }}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia
                    image={thumbnail?.[thumbnail.length - 1]?.url || demoThumbnailUrl}
                    alt={title || demoVideoTitle}
                    sx={{ width: "100%", height: 180 }}
                />
            </Link>
            <CardContent sx={{ backgroundColor: "#1e1e1e", height: '106px' }}>
                <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#fff" }}>
                        {title ? title.slice(0, 60) : demoVideoTitle.slice(0, 60)}
                    </Typography>
                </Link>
                <Link to={channelId ? `/channel/${channelId}` : demoChannelUrl}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "gray" }}>
                        {channelTitle || demoChannelTitle}
                        <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
}
