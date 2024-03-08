import { Button, Container, Stack, Typography } from "@mui/material";
import ProposalDataTable from "../components/Proposal/ProposalDataTable";
import { useState } from "react";
import ProposalModalAdd from "../components/Proposal/ProposalModalAdd";
import { Add } from "@mui/icons-material";
import ProposalModalDetail from "../components/Proposal/ProposalModalDetail";
import { getAllProposals } from "../utils/proposal_api";
import { useEffect } from "react";

export default function Proposal() {
    const [open, setOpen] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [proposalId, setProposalId] = useState();
    const [proposals, setProposals] = useState([]);
    
    useEffect(() => {
        getAllProposals()
        .then(response => {
            setProposals(response.data)
        })
        .catch(error => {
            console.error('Error fetching proposals:', error);
        });
    }, []);

    return (
        <Container sx={{ paddingTop: '6rem', minHeight: '90vh' }}>
            <Stack>
                <Typography 
                    sx={{
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}
                >
                    ARSIP PROPOSAL KEGIATAN
                </Typography>
                <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => setOpen(!open)}
                    sx={{
                        width: '100px',
                        marginBottom: '1rem'
                    }}
                >
                    <Add /> Submit
                </Button>

            </Stack>
            <ProposalDataTable setOpenDetail={setOpenDetail} setProposalId={setProposalId} proposals={proposals}/>
            <ProposalModalAdd open={open} setOpen={setOpen} />
            <ProposalModalDetail openDetail={openDetail} setOpenDetail={setOpenDetail} proposalId={proposalId}/>
        </Container>

    )
}
