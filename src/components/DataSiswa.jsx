import { Box, Button, Chip, Container, Paper } from '@mui/material'
import { blue, green, red, yellow } from '@mui/material/colors'
import { BarChart, PieChart, pieArcLabelClasses } from '@mui/x-charts'
import { useEffect, useState } from 'react';
import { getDatasiswa } from '../utils/datasiswa_api';
import { Link } from 'react-router-dom';

export default function DataSiswa() {
    const [totalSiswa, setTotalSiswa] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDatasiswa();
                setTotalSiswa(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const { tahunajaran, kelas7pa, kelas7pi, kelas8pa, kelas8pi, kelas9pa, kelas9pi } = totalSiswa || {};
    const totalPa = kelas7pa + kelas8pa + kelas9pa;
    const totalPi = kelas7pi + kelas8pi + kelas9pi;

    const chipLabel = `Data Siswa TA ${tahunajaran}`;
    const dataKelas = [
        { id: 0, value: kelas7pa + kelas7pi, label: 'Kelas 7' },
        { id: 1, value: kelas8pa + kelas8pi, label: 'Kelas 8' },
        { id: 2, value: kelas9pa + kelas9pi, label: 'Kelas 9' }
    ];

    return (
        <Box id="datasiswa">
            <Container>
                <Paper elevation={3}>
                    <Container sx={{ paddingTop: '1.5rem' }}>
                        <Chip label={chipLabel} />
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
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
                                    { data: [totalPa], label: 'Putra' },
                                    { data: [totalPi], label: 'Putri' },
                                ]}
                                xAxis={[{ scaleType: 'band', data: [chipLabel] }]}
                                colors={[blue[300], red[300]]}
                            />
                        </Box>
                    </Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1.5rem' }}>
                            <Link to='datasiswa'>
                                <Button variant='outlined' >
                                    More Info
                                </Button>
                            </Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}
