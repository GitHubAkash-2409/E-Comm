// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;
const url = `https://api.cloudinary.com/v1_1/deseziznk/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();  
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; 
  }
};

export default uploadImage;


