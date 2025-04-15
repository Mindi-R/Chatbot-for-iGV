import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const HostProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchHostProfile = async () => {
    try {
      const response = await axios.post('http://localhost:5500/api/user/host-profile', {}, {headers: {token: localStorage.getItem("token")}});
      console.log(response.message);

      if (response.data.success) {
        setName(response.data.data.username);
        setEmail(response.data.data.email);
      }
      else{
        console.log(response.data.message);
      }
    } 
    catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchHostProfile();
  }, [])

  return (
    <div>
      <p> Name: {name}</p>
      <p> Email Address: {email}</p>
    </div>
  )
}

export default HostProfile
