import React from 'react'
import {logout} from "../api/requests"
import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutUser());
    navigate("/auth");
  }

  return (
    <button className='btn-outline px-3 py-1 self-start mt-3 ' onClick={handleLogout}>Logout</button>
  )
}

export default Logout