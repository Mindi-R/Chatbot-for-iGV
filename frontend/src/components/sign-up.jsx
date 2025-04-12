import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    boardingAddressForApproval: '',
    boardingImageForApproval: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    setUploading(true);
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "imagesPendingApproval"); // 👈 use your unsigned preset name here
    data.append("folder", "imagesPendingApproval");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dnykpks6n/image/upload", data);
      setUploading(false);
      return res.data.secure_url;
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploading(false);
      return null;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setMessage('Please select an image to upload.');
      return;
    }

    const uploadedImageUrl = await uploadImageToCloudinary();
    if (!uploadedImageUrl) {
      setMessage("Image upload failed. Try again.");
      return;
    }

    const updatedFormData = {
      ...formData,
      boardingImageForApproval: uploadedImageUrl
    };

    try {
      const res = await axios.post('http://localhost:5500/api/user/sign-up', updatedFormData);
      console.log(res.data);
      
      if (res.data.success){         // If the user is successfully registered
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);    // Storing the token in the local storage
      }
      else{
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Sign up failed!');
    }
  };

  return (
    <div>
      <h2>Host Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <input type="text" name="boardingAddressForApproval" placeholder="Boarding Address" onChange={handleChange} required /><br />
        
        <input type="file" accept="image/*" onChange={handleImageChange} required /><br />
        {uploading && <p>Uploading image...</p>}
        <button type="submit" disabled={uploading}>Sign Up</button>
      </form>
      <p>{message}</p>

      <p>Already have an account? <Link to="/sign-in">Sign in here</Link></p>

    </div>
  );
}

export default SignUp;