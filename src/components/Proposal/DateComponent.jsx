import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DateComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
            direction='row'
            spacing={3}
            sx={{
                marginY: '1rem'
            }}
        >
            <DatePicker label="Tgl Mulai" />
            <DatePicker label="Tgl Selesai" />

        </Stack>
    </LocalizationProvider>
  )
}
