import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Create upload directories if they don't exist
const uploadImagePath = join(__dirname, 'uploads', 'images');
const uploadDocumentPath = join(__dirname, 'uploads', 'files');
const uploadBackupPath = join(__dirname, 'backupList');
fs.promises.mkdir(uploadImagePath, { recursive: true }).catch(err => console.error('Error creating images directory: ', err));
fs.promises.mkdir(uploadDocumentPath, { recursive: true }).catch(err => console.error('Error creating files directory: ', err));
fs.promises.mkdir(uploadBackupPath, { recursive: true }).catch(err => console.error('Error creating backups directory: ', err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/x-zip-compressed') {
            cb(null, uploadBackupPath);
        } else {
            const uploadPath = file.mimetype.startsWith('image/') ? uploadImagePath : uploadDocumentPath;
            cb(null, uploadPath);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});


const upload = multer({ storage });

// Middleware
app.use(cors());
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use('/backups', express.static(uploadBackupPath)); // Serve the backups directory statically
app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
app.post('/upload-image', upload.single('hinhAnh'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    res.status(200).json({ path: `/uploads/images/${req.file.filename}` });
});

app.post('/upload-document', upload.single('taiLieu'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    res.status(200).json({ path: `/uploads/files/${req.file.filename}` });
});

app.post('/upload-backup', upload.single('saoLuu'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    res.status(200).json({ path: `/backupList/${req.file.filename}` });
});

app.get('/list-images', (req, res) => {
    fs.readdir(uploadImagePath, (err, files) => {
        if (err) {
            console.error('Error reading images directory: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const imagePaths = files.map(file => ({
            path: `/uploads/images/${file}`
        }));
        res.json(imagePaths);
    });
});

app.get('/list-documents', (req, res) => {
    fs.readdir(uploadDocumentPath, (err, files) => {
        if (err) {
            console.error('Error reading documents directory: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const documentPaths = files.map(file => ({
            path: `/uploads/files/${file}`
        }));
        res.json(documentPaths);
    });
});

app.get('/list-backups', (req, res) => {
    fs.readdir(uploadBackupPath, (err, files) => {
        if (err) {
            console.error('Error reading backups directory: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const backupPaths = files
            .filter(file => file.endsWith('.zip'))
            .map(file => ({
                path: `/backups/${file}`
            }));
        res.json(backupPaths);
    });
});

app.delete('/delete-image/:filename', (req, res) => {
    const imagePath = join(uploadImagePath, req.params.filename);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    });
});

app.delete('/delete-document/:filename', (req, res) => {
    const documentPath = join(uploadDocumentPath, req.params.filename);
    fs.unlink(documentPath, (err) => {
        if (err) {
            console.error('Error deleting document: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    });
});

app.delete('/delete-backup/:filename', (req, res) => {
    const backupPath = join(uploadBackupPath, req.params.filename);
    fs.unlink(backupPath, (err) => {
        if (err) {
            console.error('Error deleting backup: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Backup deleted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
