import React, { useState, useRef } from 'react';
import { CircularProgress, TextField, InputAdornment, IconButton } from '@mui/material';
import { uploadFile, deleteFile } from '../utils/HinhAnhUtils';
import ClearIcon from '@mui/icons-material/Clear';

const FileUpload = ({ accept, onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadedFilePaths, setUploadedFilePaths] = useState([]);
    const fileInputRef = useRef(null);

    const deleteUploadedFiles = () => {
        const deletePromises = uploadedFilePaths.map((path) => {
            const filename = path.substring(path.lastIndexOf('/') + 1);
            return deleteFile(getFileType(), filename)
                .then(() => {
                    console.log('File deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting file: ', error);
                });
        });

        Promise.all(deletePromises).then(() => {
            setUploadedFilePaths([]); // Reset uploaded file paths
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        });
    };

    const getFileType = () => {
        if (accept === 'image/*') return 'image';
        if (accept === 'application/*') return 'document';
        return 'backup';
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setUploading(true);

            // Delete previously uploaded files
            if (uploadedFilePaths.length > 0) {
                console.log('Deleting previously uploaded files: ', uploadedFilePaths);
                deleteUploadedFiles();
            }

            const uploadPromises = Array.from(files).map((file) =>
                uploadFile(file, getFileType())
                    .then(response => response.data.path)
                    .catch(error => {
                        console.error('Error uploading file: ', error);
                        return null;
                    })
            );

            Promise.all(uploadPromises).then((paths) => {
                const successfulUploads = paths.filter(path => path !== null);
                setUploadedFilePaths(successfulUploads);
                setUploading(false);
                onUploadSuccess(successfulUploads);
            });
        }
    };

    const getLabel = () => {
        if (accept === 'image/*') return 'Chọn hình ảnh';
        if (accept === 'application/*') return 'Chọn tài liệu đính kèm';
        return 'Chọn tập tin sao lưu (.zip)';
    };

    return (
        <TextField
            sx={{ padding: 0, margin: 0}}
            type="file"
            inputProps={{ accept: accept === 'backup' ? '.zip' : accept, multiple: accept !== 'image/*' }}
            onChange={handleFileChange}
            variant="outlined"
            margin="normal"
            label={getLabel()}
            InputLabelProps={{ shrink: true }}
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {uploading && <CircularProgress size={20} />}
                        {uploadedFilePaths.length > 0 && (
                            <IconButton edge="end" onClick={deleteUploadedFiles}>
                                <ClearIcon />
                            </IconButton>
                        )}
                    </InputAdornment>
                ),
            }}
            inputRef={fileInputRef}
        />
    );
};

export default FileUpload;
