import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack } from '@mui/material';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { getProposalDetail, getProposalFile } from '../../utils/proposal_api';
import { useState } from 'react';
import { CalendarMonth, Download, MonetizationOn, Money, Note, Person } from '@mui/icons-material';
import dayjs from 'dayjs';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const convertToRupiah = (angka) => {
    if (angka) {
        let rupiah = '';
        let angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }
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

    const dateStart = dayjs(proposalDetail.date_started).format('DD MMM YYYY');
    const dateEnd = dayjs(proposalDetail.date_ended).format('DD MMM YYYY');
    const idrRealisasi = convertToRupiah(proposalDetail.realization_amt);
    const idrAnggaran = convertToRupiah(proposalDetail.proposal_amt);
    const sisaAnggaran = convertToRupiah(proposalDetail.proposal_amt - proposalDetail.realization_amt);

    async function handleDownload(pdfTitle) {
        try {
            await getProposalFile(pdfTitle);
        } catch (error) {
            console.error('Error downloading proposal file:', error);
            // Handle error (e.g., show an error message)
        }
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
                elevation={3}
                sx={{
                    mt: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    width: { sm: '60%' },
                    marginX: 'auto'
                }}
            >
                <Stack>
                    <List sx={{ width: '80%', bgcolor: 'background.paper', marginX: 'auto', }}>
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
                                primary={sisaAnggaran? sisaAnggaran : 'Rp. 0'}
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
                                primary={proposalDetail.proposal_notes ? proposalDetail.proposal_notes : '-'}
                                secondary="Catatan"
                            />
                        </ListItem>
                    </List>
                    <Button
                        variant="contained"
                        startIcon={<Download />}
                        sx={{
                            width: { sm: '50%' },
                            marginX: 'auto',
                            marginY: '1.5rem'

                        }}
                        onClick={() => handleDownload(proposalDetail.pdffile_titles)}
                    >
                        Download File
                    </Button>
                </Stack>
            </Paper>
        </Dialog>
    );
}

