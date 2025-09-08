// components/CloudinaryUpload.js
import { useState } from 'react';
import { useInput, useNotify } from 'react-admin';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

const CloudinaryUpload = ({ source }) => {
  const notify = useNotify();
  const { field } = useInput({ source });
  const [imageUrl, setImageUrl] = useState('');
  const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
      field.onChange(data.secure_url);
      notify('Image uploaded successfully', { type: 'success' });
    } catch (error) {
      notify('Upload failed', { type: 'error' });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <AdvancedImage
            cldImg={cld.image(imageUrl.split('/').pop().split('.')[0])}
            width="300"
          />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;