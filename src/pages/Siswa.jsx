import { Box, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

export default function Siswa() {
  const siswaColumns = [
    { field: 'no', headerName: 'No', width: 87 },
    { field: 'nisn', headerName: 'NISN', minWidth: 300 },
    { field: 'name', headerName: 'Nama', minWidth: 200, sortable: false },
    { field: 'dob', headerName: 'TTL', type: 'Date', minWidth: 120 },
    { field: 'kelas', headerName: 'Kelas', minWidth: 120 },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 120,
      renderCell: (params) => <Button variant='outlined' size='small' onClick={() => handleClick(params.row.siswa_id)}>Detail</Button>
    },
  ];

  const siswaRows = students.map((student, index) => ({
    student_id: student.student_id,
    no: index + 1,
    nisn: student.nisn,
    name: student.names,
    dob: dayjs(student.date_started).format('DD/MM/YYYY'),
    kelas: student.student_class,
  }))

  return (
    <Box >
      <DataGrid>

      </DataGrid>
    </Box>
  )
}
