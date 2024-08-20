import axios from "../axios";


export const uploadFile = async (formData: FormData, setUploadProgress: (progress: number) => void) => {
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


//--------test region


// export const uploadTestFunc = async (fileName: string, fileType: string, partCount: number) => {
//     const body = {
//         fileName: fileName,
//         fileType: fileType,
//         partCount: partCount,
//     }
//     return await axios.post('/file/upload/uploadinit', body);
// }







