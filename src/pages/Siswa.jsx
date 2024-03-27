import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getAllSiswa, getTotalSiswa } from "../utils/datasiswa_api";
import { ExportToExcel } from "../components/ExportToExcel";
import SiswaModalDetail from "../components/Siswa/SiswaModalDetail";

export default function Siswa() {
  const [studentsData, setStudentsData] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);
  const fileName = "dataSiswa";

  const [siswaId, setSiswaId] = useState();
  const [open, setOpen]  = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSiswa(paginationModel.page, paginationModel.pageSize);
        setStudentsData(result.data);
        const total = await getTotalSiswa();
        setRowCountState(total.data.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [paginationModel]);


  const Columns = [
    { field: 'id', hideable: false },
    { field: 'no', headerName: 'No', width: 87 },
    { field: 'nisn', headerName: 'NISN', minWidth: 100 },
    { field: 'name', headerName: 'Nama', flex: 1, sortable: false },
    { field: 'dob', headerName: 'TTL', type: 'Date' },
    { field: 'kelas', headerName: 'Kelas'},
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => <Button variant='outlined' size='small' onClick={() => {handleClickOpen(params.row.id)}}>Detail</Button>
    },
  ];

  const Rows = studentsData.map((student, index) => ({
    id: student.replid,
    no: index + 1 + paginationModel.page * paginationModel.pageSize,
    nisn: student.nisn,
    name: student.nama,
    dob: dayjs(student.tgllahir).format('DD/MM/YYYY'),
    kelas: student.kelas,
  }))
 
  const handleClickOpen = (id) => {
    setSiswaId(id)
    setOpen(true);
  }

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
      <Box sx={{marginBottom: '1rem'}}>
        <ExportToExcel apiData={Rows} fileName={fileName}/>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          columns={Columns}
          rows={Rows}
          rowCount={rowCountState}
          pageSizeOptions={[10, 25, 50, 100]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      )}

      <SiswaModalDetail id={siswaId} open={open} setOpen={setOpen}/>
    </Container>
  )
}
