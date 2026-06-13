const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addCourse, getCourse, d, appendCourseLinks } = require('../controllers/courseControllers.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/addC', upload.single('image'), addCourse);
router.get('/v', getCourse);
router.delete('/d/:name', d);
router.post('/appendC', appendCourseLinks);

module.exports = router;