import axios from "../axios";


export const UploadFile = async (formData: FormData, setUploadProgress: (progress: number) => void) => {

    return await axios.post("/file", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(progress);
            }
        },
    });
};


