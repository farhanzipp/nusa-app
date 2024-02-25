import { Box, Container, Stack, Typography } from "@mui/material";

export default function Hero() {
    return (
        <Box
            id='hero'
            sx={{
                width: '100%',
                backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        component="h1"
                        variant="body-1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                        NUSA APP
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        We come to make Your life easier <br />
                    </Typography>
                </Stack>
            </Container>
        </Box>
    )
}
