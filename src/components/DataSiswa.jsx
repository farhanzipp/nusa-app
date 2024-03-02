import { Box, Button, Chip, Container, Paper } from '@mui/material'
import { blue, green, red, yellow } from '@mui/material/colors'
import { BarChart, PieChart, pieArcLabelClasses } from '@mui/x-charts'

export default function DataSiswa() {
    const chipLabel = 'Data Siswa ' + new Date().getFullYear();
    const dataKelas = [
        { id: 0, value: 200, label: 'Kelas 7' },
        { id: 1, value: 255, label: 'Kelas 8' },
        { id: 2, value: 250, label: 'Kelas 9' }
    ];

    return (
        <Box id="datasiswa">
            <Container>
                <Paper elevation={3}>
                    <Container sx={{ paddingTop: '1.5rem' }}>
                        <Chip label={chipLabel} />
                        <Box sx={{display: 'flex', flexDirection: {xs:'column', sm:'row'} }}>
                            <PieChart
                                series={[
                                    {
                                        data: dataKelas,
                                        arcLabel: (item) => `${item.value}`,
                                        arcLabelMinAngle: 45,
                                        innerRadius: 22,
                                        outerRadius: 82,
                                        paddingAngle: 3,
                                        cornerRadius: 0,
                                        startAngle: 0,
                                        endAngle: 360,
                                    },
                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: '#333',
                                        fontWeight: 'bold',
                                    },
                                }}
                                width={300}
                                height={200}
                                colors={[green[500], yellow[500], red[500]]}

                            />

                            <BarChart
                                width={300}
                                height={200}
                                series={[
                                    { data: [600], label: 'Putra' },
                                    { data: [578], label: 'Putri' },
                                ]}
                                xAxis={[{ scaleType: 'band', data: [chipLabel] }]}
                                colors={[blue[300], red[300]]}
                            />
                        </Box>
                    </Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1.5rem' }}>
                        <Button variant='outlined' >
                            More Info
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}
