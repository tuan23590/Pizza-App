import axios from 'axios';
import { IMAGE_SERVER } from './constants';

const uploadFile = (file, fileType, onUploadProgress) => {
    const formData = new FormData();
    const fieldName = fileType === 'image' ? 'hinhAnh' : fileType === 'document' ? 'taiLieu' : 'saoLuu';
    console.log(`Uploading ${fileType}: `, file);
    formData.append(fieldName, file);

    return axios.post(`${IMAGE_SERVER}/upload-${fileType}`, formData, {
        onUploadProgress
    });
};

const fetchUploadedImages = () => {
    return axios.get(`${IMAGE_SERVER}/list-images`);
};

const fetchUploadedDocuments = () => {
    return axios.get(`${IMAGE_SERVER}/list-documents`);
};

const fetchUploadedBackups = () => {
    return axios.get(`${IMAGE_SERVER}/list-backups`);
};

const deleteFile = (fileType, filename) => {
    const deleteEndpoint = fileType === 'image' ? 'delete-image' : fileType === 'document' ? 'delete-document' : 'delete-backup';
    return axios.delete(`${IMAGE_SERVER}/${deleteEndpoint}/${encodeURIComponent(filename)}`)
        .then(response => {
            console.log(`${fileType} deleted successfully`);
            return response.data; // Return the data after successful deletion
        })
        .catch(error => {
            console.error(`Error deleting ${fileType}: `, error);
            throw error;
        });
};

export { uploadFile, fetchUploadedImages, fetchUploadedDocuments, fetchUploadedBackups, deleteFile };
