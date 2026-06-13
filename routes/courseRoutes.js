const express = require('express')
const app = express();
const router = express.Router();
const { addCourse, getCourse, d, appendCourseLinks } = require('../controllers/courseControllers.js');
const multer = require('multer');

const storage = multer.diskStorage({

    destination : (req, file, cb) => {
        cb(null, './uploads');
    },

    filename : (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }

});

const upload = multer({
    storage : storage
});

router.post('/addC', upload.single('image'), addCourse)
router.get('/v', getCourse)
router.delete('/d/:name', d)
app.post('/appendC', appendCourseLinks);



module.exports = router;