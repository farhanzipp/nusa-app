import { forwardRef, useEffect, useState } from "react"
import { getDetailSiswa } from "../../utils/datasiswa_api";
import { AppBar, Dialog, IconButton, Paper, Slide, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

    export default function SiswaModalDetail( {id, open, setOpen} ) {
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
                    mt: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    width: { sm: '60%' },
                    marginX: 'auto'
                }}
            >
                <h1>{detailData.nama}</h1>
            </Paper>
        </Dialog>
    )
}
