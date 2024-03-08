import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DATASISWA from '../assets/datasiswa.png'
import PROPOSAL from '../assets/proposal.png'
import PSB from '../assets/psb.png'

function AppCard({ title, image, content, link }) {
    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardMedia
                sx={{ height: 150 }}
                image={image}
                title={title}
            />
            <CardContent sx={{ height: 100 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={link}>
                    <Button size="small">Visit</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default function AppCollection() {
    const cardDatas = [
        {
            title: "Data Siswa",
            image: DATASISWA,
            content: "Aplikasi pengelolaan data NUSA",
            link: "/datasiswa"
        },
        {
            title: "Dashboard PSB",
            image: PSB,
            content: "Aplikasi Wawancara PSB",
            link: "https://www.google.com"
        },
        {
            title: "Proposal Kegiatan",
            image: PROPOSAL,
            content: "Aplikasi arsip proposal kegiatan NUSA",
            link: "/proposal"
        },
    ]
    return (
        <Container id="aplikasi">
            <Box elevation={3} sx={{ marginY: '2rem',  paddingY: '1.5rem' }}>
                    <Chip label='Aplikasi' sx={{ marginBottom: '1rem' }} />
                    <Grid container spacing={2}>
                    
                    {cardDatas.map((data, index) => 
                        <Grid item xs={12} sm={6} md={4} key = {index}>
                            <AppCard
                                title={data.title}
                                image={data.image}
                                content={data.content}
                                link={data.link}
                            />
                        </Grid>
                    )}
                    </Grid>
            </Box>
        </Container>
    )
}
