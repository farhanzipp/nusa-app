import { Button, Chip, Container, Stack, Typography } from "@mui/material";
import DataTable from "../components/DataTable";
import { useState } from "react";
import ModalAddProposal from "../components/Proposal/ModalAddProposal";
import { Add } from "@mui/icons-material";

export default function Proposal() {
    const [open, setOpen] = useState(false);

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
            <DataTable />
            <ModalAddProposal open={open} setOpen={setOpen} />
        </Container>

    )
}
