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
    data.append("upload_preset", "imagesPendingApproval");
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
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        toast.success("Signed up successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Sign up failed!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Host Sign Up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="boardingAddressForApproval"
          placeholder="Boarding Address"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      {message && <p className="text-red-500 mt-3">{message}</p>}
      <p className="mt-4 text-center text-sm">
        Already have an account? <Link to="/sign-in" className="text-blue-500 hover:underline">Sign in here</Link>
      </p>
    </div>
  );
}

export default SignUp;
