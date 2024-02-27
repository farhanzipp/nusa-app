import { Button, Chip, Container } from "@mui/material";
import DataTable from "../components/DataTable";
import { useState } from "react";
import ModalAddProposal from "../components/Proposal/ModalAddProposal";

export default function Proposal() {
    const [open, setOpen] = useState(false);

    return (
        <Container sx={{ paddingTop: '6rem', minHeight: '90vh' }}>
            <Chip label="Proposal Kegiatan" sx={{ marginBottom: '1rem' }}></Chip>
            <Button variant="outlined" size="small" onClick={() => setOpen(!open)}>
                Submit Proposal
            </Button>
            <DataTable />
            <ModalAddProposal open={open} setOpen={setOpen} />
        </Container>

    )
}
