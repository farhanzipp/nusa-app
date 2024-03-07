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
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const maxSize = 2 * 1024 * 1024; // 2 MB
        if (selectedFile && selectedFile.size > maxSize) {
            alert('File size exceeds the limit (2 MB). Please select a smaller file.');
        } else {
            setFile(selectedFile);
        }
    };

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            sx={{ marginTop: '1rem' }}

        >
            {file ? file.name : 'UPLOAD FILE'}
            <VisuallyHiddenInput
                id="proposal_file"
                name="proposal_file"
                type="file"
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                required
            />
        </Button>
    )
}
