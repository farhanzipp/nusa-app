import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/id';

export default function DateComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='id'>
        <Stack
            direction='row'
            spacing={3}
            sx={{
                marginY: '1rem'
            }}
        >
            <DatePicker 
              id="date_started"
              name="date_started"
              label="Tgl Mulai" 
            />
            <DatePicker 
              id="date_ended"
              name="date_ended"
              label="Tgl Selesai"  
            />

        </Stack>
    </LocalizationProvider>
  )
}
