import axios from "axios";

export const uploadFile = (file) => {
    const CLOUDINARY_NAME = "ductham087";
    const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
    const CLOUDINARY_PRESET = "upload_images";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = axios.post(CLOUDINARY_API, formData, {
        headers: {
            "Content-Type": "application/form-data"
        }
    });
    return res

};



const formAdd = document.getElementById("form");
const productImage = document.getElementById("img");
if (formAdd) {
    formAdd.addEventListener("submit", async(e) => {
        e.preventDefault()
        const response = await uploadFile(productImage.files[0]);
        console.log(response)
        if (response) {
            const product = {
                image: response.data.url,
            };
            console.log(product)
        }
        // call api add product
    });
}