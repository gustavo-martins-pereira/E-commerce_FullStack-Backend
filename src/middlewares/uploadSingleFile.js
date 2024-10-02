import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadSingleFile = (fieldName) => upload.single(fieldName);

export default uploadSingleFile;
