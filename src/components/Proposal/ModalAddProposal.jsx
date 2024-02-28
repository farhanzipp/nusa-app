import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Container, TextField } from '@mui/material';
import DateComponent from './DateComponent';
import { Add } from '@mui/icons-material';
import UploadFileButton from './UploadFileButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAddProposal({ open, setOpen }) {
    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleSubmit = () => {
        console.log('submit')
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
                        noValidate onSubmit={handleSubmit}

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
                        <DateComponent />

                        <TextField
                            id="catatan"
                            name="catatan"
                            label="Catatan Penting"
                            margin='dense'
                            fullWidth
                            multiline
                            rows={3}
                        />

                        <UploadFileButton />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <Add />
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Dialog>
    );
}
