import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Container, Stack, TextField } from '@mui/material';
import { Save } from '@mui/icons-material';
import UploadFileButton from './UploadFileButton';
import { postProposal, postProposalFile } from '../../utils/proposal_api';
import dayjs from 'dayjs';
import { useState } from 'react';
import { forwardRef } from 'react';
import ProposalDateComponent from './ProposalDateComponent';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProposalModalAdd({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleClickOpen = () => {
        setOpen(!open);
    };

    function renameProposalFile(file, newFileName) {
        const fileExtension = file.name.split('.').pop(); // Get the file extension
        const renamedFile = new File([file], newFileName + '.' + fileExtension, { type: file.type });
        return renamedFile;
    }

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        const dateStart = dayjs(data.get('date_started')).format('YYYY-MM-DD');
        const dateEnd = dayjs(data.get('date_ended')).format('YYYY-MM-DD')
        
        let pdfName = ''
        const proposalData = {
            proposal_titles: data.get('proposal_titles'),
            commitee_names: data.get('commitee_names'),
            date_started: dateStart,
            date_ended: dateEnd,
            proposal_amt: data.get('proposal_amt'),
            realization_amt: data.get('realization_amt'),
            proposal_notes: data.get('proposal_notes'),
            pdffile_titles: pdfName
        }

        const proposalFile = data.get('proposal_file')
        const renamedProposalFile = renameProposalFile(proposalFile, proposalData.proposal_titles.toLowerCase().replace(/[^a-z]/g, "_"));
        pdfName = renamedProposalFile.name;
        proposalData.pdffile_titles = pdfName;

        try {
            await postProposalFile(renamedProposalFile);
            await postProposal(proposalData);

            alert('Proposal submitted successfully!');
            setLoading(false)
            handleClickOpen();
            navigate('/');
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit proposal. Please try again later.');
        }
    }

    return (
        <Dialog
            fullScreen
            open={open}
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
                        Tambah Data Proposal
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container>
                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}

                    >
                        <TextField
                            id="proposal_titles"
                            name="proposal_titles"
                            label="Judul Kegiatan"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            id="commitee_names"
                            name="commitee_names"
                            label="Ketua Panitia"
                            margin="normal"
                            required
                            fullWidth
                        />

                        <ProposalDateComponent />

                        <Stack
                            direction='row'
                            spacing={3}
                            sx={{
                                marginTop: '1.5rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <TextField
                                id="proposal_amt"
                                name="proposal_amt"
                                label="Anggaran"
                                type='number'
                                margin="normal"
                                required
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                id="realization_amt"
                                name="realization_amt"
                                label="Realisasi Anggaran"
                                type='number'
                                margin="normal"
                                required
                                fullWidth
                            />
                        </Stack>

                        <TextField
                            id="proposal_notes"
                            name="proposal_notes"
                            label="Catatan Penting"
                            margin='dense'
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <Box 
                            sx={{
                                display: 'flex',
                                alignItems: 'end',
                                gap:'5px'
                            }}
                        >
                            <UploadFileButton />
                            <Typography variant="caption">
                                format doc. max 2mb
                            </Typography>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading? true: false}
                            startIcon={<Save />}
                        >
                            {loading? 'LOADING...':'SAVE'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Dialog>
    );
}

