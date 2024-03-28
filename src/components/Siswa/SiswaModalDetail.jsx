import { forwardRef, useEffect, useState } from "react"
import { getDetailSiswa } from "../../utils/datasiswa_api";
import { AppBar, Dialog, Grid, IconButton, Paper, Slide, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ItemData({ title, data }) {
    return (
        <Grid item container xs={12} sm={6}>
            <Grid item xs={4}>
                <Typography variant="body1">
                    <b>{title}</b>
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body1">
                    {data}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default function SiswaModalDetail({ id, open, setOpen }) {
    const [detailData, setDetailData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDetailSiswa(id);
                setDetailData(result.data[0])
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (id && open) {
            fetchData();
        }
    }, [open, id])

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Detail Siswa
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper
                elevation={3}
                sx={{
                    margin: '1.5rem',
                    padding: '1.5rem',
                    width: { sm: '70%', lg: '50%' },
                    marginX: 'auto'
                }}
            >
                <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{ marginBottom: '1.5rem' }}>
                    <ItemData title='Nama' data={detailData.nama} />
                    <ItemData title='NISN' data={detailData.nisn} />
                    <ItemData title='NIS' data={detailData.nis} />
                    <ItemData title='NIK' data={detailData.nik} />
                </Grid>

                <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 4 }} >
                    <ItemData title='TTL' data={detailData.tmplahir + ' , ' + dayjs(detailData.tgllahir).format('DD MMM YYYY')} />
                    <ItemData title='Kelamin' data={detailData.kelamin === 'l' ? 'Laki-laki' : 'Perempuan'} />
                    <ItemData title='J. Saudara' data={detailData.anakke + ' dari ' + detailData.jsaudara} />
                    <ItemData title='A. Sekolah' data={detailData.asalsekolah} />
                    <ItemData title='Hobi/Cita' data={detailData.hobi} />
                    <ItemData title='Kode Pos' data={detailData.kodepossiswa} />
                </Grid>

                <Grid item container xs={12} sx={{ marginY: '1.5rem' }}>
                    <Grid item xs={4} sm={2}>
                        <Typography variant="body1">
                            <b>Alamat</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={10}>
                        <Typography variant="body1">
                            {detailData.alamatsiswa}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 4 }}  sx={{ marginBottom: '1.5rem' }}>
                    <ItemData title='Ayah' data={detailData.namaayah} />
                    <ItemData title='TTL Ayah' data={detailData.tmplahirayah + ' , ' + dayjs(detailData.tgllahirayah).format('DD MMM YYYY')} />
                    <ItemData title='Pendidikan' data={detailData.pendidikanayah } />
                    <ItemData title='Pekerjaan' data={detailData.pekerjaanayah } />
                    <ItemData title='Penghasilan' data={detailData.penghasilanayah } />
                    <ItemData title='HP 1' data={detailData.hportu } />
                </Grid>

                <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{ marginBottom: '1.5rem' }}>
                    <ItemData title='Ibu' data={detailData.namaibu} />
                    <ItemData title='TTL Ibu' data={detailData.tmplahiribu + ' , ' + dayjs(detailData.tgllahirayah).format('DD MMM YYYY')} />
                    <ItemData title='Pendidikan' data={detailData.pendidikanibu } />
                    <ItemData title='Pekerjaan' data={detailData.pekerjaanibu } />
                    <ItemData title='Penghasilan' data={detailData.penghasilanibu } />
                    <ItemData title='HP 2' data={detailData.hportu } />
                </Grid>

                <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{ marginBottom: '1.5rem' }}>
                    <ItemData title='No KK' data={'-'} />
                    <ItemData title='NIK Ayah' data={'-'} />
                    <ItemData title='NIK Ibu' data={'-'} />
                </Grid>
            </Paper>
        </Dialog>
    )
}
