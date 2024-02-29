import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Container, Paper, Stack } from '@mui/material';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { getProposalDetail } from '../../utils/proposal_api';
import { useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProposalModalDetail({ openDetail, setOpenDetail, proposalId }) {
    const handleClickOpen = () => {
        setOpenDetail(!open);
    };

    const [proposalDetail, setProposalDetail] = useState({});

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
        if (openDetail && proposalId) {
            fetchData();
        }
    }, [openDetail, proposalId]);

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

            <Container>
                <Paper
                    sx={{
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Stack>
                        <Typography>
                            {proposalDetail.proposal_titles}
                        </Typography>
                        <Typography>
                            {proposalDetail.commitee_names}
                        </Typography>
                        <Typography>
                            {proposalDetail.date_started}
                        </Typography>
                        <Typography>
                            {proposalDetail.date_ended}
                        </Typography>
                        <Typography>
                            {proposalDetail.proposal_amt}
                        </Typography>
                        <Typography>
                            {proposalDetail.realization_amt}
                        </Typography>
                        <Typography>
                            {proposalDetail.proposal_notes}
                        </Typography>

                    </Stack>
                </Paper>
            </Container>
        </Dialog>
    );
}

