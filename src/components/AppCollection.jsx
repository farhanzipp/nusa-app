import { Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Grid, Link, Paper, Typography } from "@mui/material";

function AppCard({ title, image, content, link }) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Link href={link} target="_blank" underline="hover">
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
            image: "datasiswa.JPG",
            content: "Aplikasi pengelolaan data NUSA",
            link: "https://www.google.com"
        },
        {
            title: "Dashboard PSB",
            image: "datasiswa.JPG",
            content: "Aplikasi Wawancara PSB",
            link: "https://www.google.com"
        },
        {
            title: "Proposal Kegiatan",
            image: "datasiswa.JPG",
            content: "Aplikasi Wawancara PSB",
            link: "https://www.google.com"
        },
    ]
    return (
        <Container id="aplikasi">
            <Paper elevation={3} sx={{ marginY: '2rem',  paddingY: '1.5rem' }}>
                <Container>
                    <Chip label='Aplikasi' sx={{ marginBottom: '1rem' }} />
                    <Grid container spacing={2}>
                    
                    {cardDatas.map((data, index) => 
                        <Grid item xs={12} md={4} key = {index}>
                            <AppCard
                                title={data.title}
                                image={data.image}
                                content={data.content}
                                link={data.link}
                            />
                        </Grid>
                    )}
                    </Grid>
                </Container>
            </Paper>
        </Container>
    )
}
