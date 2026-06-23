import { Stack, Box } from '@mui/material';
import { VideoCard, ChannelCard } from "./"

export default function Videos({ videos }) {
    return (
        <div>
            <Stack
                direction="row"
                sx={{ flexWrap: "wrap", justifyContent: "center", gap: 2, }}
            >
                {videos?.map((item, idx) => (
                    <Box key={idx}>
                        {item.type === "video" && <VideoCard video={item} />}
                        {item.type === "channel" && <ChannelCard channelDetail={item} />}
                    </Box>
                ))}
            </Stack>
        </div>
    )
}