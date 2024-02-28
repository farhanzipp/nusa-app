import { CloudUpload } from '@mui/icons-material'
import { Button, styled } from '@mui/material'
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadFileButton() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            sx={{marginTop: '1rem'}}
        >
            {selectedFile ? selectedFile.name : 'UPLOAD FILE'}
            <VisuallyHiddenInput 
                id="proposal_file" 
                name="proposal_file" 
                type="file"
                onChange={handleFileChange}
            />
        </Button>
    )
}
