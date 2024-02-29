import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Table } from '@mui/material';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { getProposalDetail } from '../../utils/proposal_api';
import { useState } from 'react';
import { CalendarMonth, Download, Folder, MonetizationOn, Money, Note, Person } from '@mui/icons-material';
import dayjs from 'dayjs';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const convertToRupiah =(angka) => {
    let rupiah = '';
    let angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

export default function ProposalModalDetail({ openDetail, setOpenDetail, proposalId }) {
    const [proposalDetail, setProposalDetail] = useState({});
    const handleClickOpen = () => {
        setOpenDetail(!open);
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProposalDetail(proposalId);
                setProposalDetail(data.data);
            } catch (error) {
                console.error('Error fetching proposal detail:', error);
            }
        };

        // Fetch proposal detail when modal is open or when proposalId changes
        if (proposalId) {
            fetchData();
        }
    }, [proposalId]);

    // function convertToRupiah(amount) {
    //     return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    // }

    let dateStart = '';
    let dateEnd = '';
    let sisaAnggaran = '';
    let idrAnggaran = '';
    let idrRealisasi = '';

    if (proposalDetail > 0) {
        dateStart = dayjs(proposalDetail.date_started).format('DD MMM YYYY');
        dateEnd = dayjs(proposalDetail.date_ended).format('DD MMM YYYY');
        sisaAnggaran = proposalDetail.proposal_amt - proposalDetail.realization_amt;
        idrAnggaran = convertToRupiah(proposalDetail.proposal_amt);
        idrRealisasi = convertToRupiah(proposalDetail.realization_amt);
    }
    return (
        <Dialog
            fullScreen
            open={openDetail}
            onClose={handleClickOpen}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={handleClickOpen}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Detail Kegiatan
                    </Typography>
                </Toolbar>
            </AppBar>

            <Paper
                sx={{
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >   
                <Stack>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Person />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={proposalDetail.commitee_names}
                            secondary="Ketua Panitia"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarMonth />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${dateStart} - ${dateEnd}`}
                            secondary="Tanggal Pelaksanaan"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MonetizationOn />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={idrAnggaran}
                            secondary="Anggaran Kegiatan"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MonetizationOn />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={idrRealisasi}
                            secondary="Anggaran Digunakan"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Money />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={sisaAnggaran}
                            secondary="Sisa Anggaran"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Note />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={proposalDetail.proposal_notes}
                            secondary="Catatan"
                        />
                    </ListItem>
                </List>
                    <Button variant="contained" startIcon={<Download />}>
                        Download File
                    </Button>
                    </Stack>
            </Paper>
        </Dialog>
    );
}

