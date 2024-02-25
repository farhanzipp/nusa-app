import { Box, Container } from '@mui/material'
import { PieChart } from '@mui/x-charts'

export default function DataSiswa() {
    return (
        <Container maxWidth='100%'>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 200, label: 'kelas 7' },
                            { id: 1, value: 255, label: 'kelas 8' },
                            { id: 2, value: 250, label: 'kelas 9' },
                        ],
                        innerRadius: 22,
                        outerRadius: 82,
                        paddingAngle: 3,
                        cornerRadius: 0,
                        startAngle: 0,
                        endAngle: 360,
                    },
                ]}
                height={200}
                cx={'100%'}
            />
        </Container>
    )
}
