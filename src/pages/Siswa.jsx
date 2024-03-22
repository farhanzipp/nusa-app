import { Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getAllSiswa } from "../utils/datasiswa_api";

export default function Siswa() {
  let rowCount = 300;
  const [studentsList, setStudentsList] = useState([]);
  const [rowCountState, setRowCountState] = useState(rowCount);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10
  });
  
  useEffect(() => {
    getAllSiswa(controller.page, controller.rowsPerPage)
      .then(response => {
        setStudentsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [controller.page, controller.rowsPerPage]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState,
    );
  }, [rowCount, setRowCountState]);

  const handleClick = () => {
    console.log('hello');
  }
  const studentColumns = [
    { field: 'no', headerName: 'No', width: 87 },
    { field: 'nisn', headerName: 'NISN', minWidth: 100 },
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

  const studentRows = studentsList.map((student, index) => ({
    id: student.replid,
    no: index + 1,
    nisn: student.nisn,
    name: student.nama,
    dob: dayjs(student.date_started).format('DD/MM/YYYY'),
    kelas: student.kelas,
  }))

  return (
    <Container sx={{ paddingTop: '6rem', minHeight: '90vh' }}>
      <Typography
        sx={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}
      >
        DATA SISWA
      </Typography>
      <DataGrid
        columns={studentColumns}
        rows={studentRows}
        paginationMode="server"
        rowCount={rowCountState}
      />

    </Container>
  )
}
