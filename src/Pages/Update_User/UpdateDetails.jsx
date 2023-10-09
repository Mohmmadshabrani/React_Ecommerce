import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle, AiFillDelete, AiOutlineFileDone } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import styles from './Update.module.css'
import { toast } from 'react-toastify'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { TiArrowBackOutline } from 'react-icons/ti';

import { Transition } from '../../Constants/Constant'
import CopyRight from '../../Components/CopyRight/CopyRight'


const UpdateDetails = () => {
    const [userData] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false
    const [userDetails, setUserDetails] = useState({ 
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: ''
    })
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    let navigate = useNavigate()
    useEffect(() => {
        if (setProceed) {
            getUserData();
        } else {
            navigate('/');
        }
    }, []);
    const getUserData = async () => {
        try {
            const { data } = await axios.post('http://localhost:8000/src/Apis/profile/GetUserData.php', authToken);
            setUserDetails(data);
        } catch (error) {
            toast.error("Something went wrong while fetching user data", { autoClose: 500, theme: 'colored' });
        }
    }
    const handleOnChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // let zipRegex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!userDetails.email && !userDetails.firstName && !userDetails.phoneNumber && !userDetails.lastName && !userDetails.address && !userDetails.city) {
                toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
            }
            else if (userDetails.firstName.length < 3 || userDetails.lastName.length < 3) {
                toast.error("Please enter name with more than 3 characters", { autoClose: 500, theme: 'colored' })
            }
            else if (!emailRegex.test(userDetails.email)) {
                toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
            }
            else if (!phoneRegex.test(userDetails.phoneNumber)) {
                toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
            }
            else if (!userDetails.address) {
                toast.error("Please add address", { autoClose: 500, theme: 'colored' })
            }
            else if (!userDetails.city) {
                toast.error("Please add city", { autoClose: 500, theme: 'colored' })
            }
            else {
                const { data } = await axios.put('http://localhost:8000/src/Apis/profile/UpdateUserData.php', {
                    authToken,
                    userDetails
                });
                if (data.success === true) {
                    toast.success("Updated Successfully", { autoClose: 500, theme: 'colored' });
                    getUserData();

                } else {
                    toast.error("Something went wrong", { autoClose: 500, theme: 'colored' });
                }
            }}
        
        catch (error) {
            console.log(error);
            toast.error(error.response.data, { autoClose: 500, theme: 'colored' })

        }
    }
    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            if (!password.currentPassword && !password.newPassword) {
                toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
            }
            else if (password.currentPassword.length < 5) {
                toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' })
            }
            else if (password.newPassword.length < 5) {
                toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
            }
            else {
                const { data } = await axios.post('http://localhost:8000/src/Apis/profile/ResetPassword.php', {
                    id: authToken,
                    currentPassword: password.currentPassword,
                    newPassword: password.newPassword,
                });
                toast.success(data, { autoClose: 500, theme: 'colored' })
                setPassword(password.currentPassword = "", password.newPassword = "")
            
            }
        } catch (error) {
            toast.error(error.response.data, { autoClose: 500, theme: 'colored' })
            console.log(error);
        }

    }
    return (
        <>
            <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10 }}>
                <Typography variant='h6' sx={{ margin: '30px 0', fontWeight: 'bold', color: '#1976d2' }}>Personal Information</Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={userDetails.firstName }
                            onChange={handleOnChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={userDetails.lastName || ''}
                            onChange={handleOnChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Contact Number"
                            name="phoneNumber"
                            value={userDetails.phoneNumber || ''}
                            onChange={handleOnChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={userDetails.email || ''}
                            onChange={handleOnChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            name="address"
                            value={userDetails.address || ''}
                            onChange={handleOnChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="City"
                            name="city"
                            value={userDetails.city || ''}
                            onChange={handleOnChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                  
                 
                </Grid>
                <Container>
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </Container>
            </form>

                <Typography variant='h6' sx={{ margin: '20px 0', fontWeight: 'bold', color: '#1976d2' }}>Reset Password</Typography>
                <form onSubmit={handleResetPassword}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                label="Current Password"
                                name='currentPassword'
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                                            {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                                        </InputAdornment>
                                    )
                                }}
                                value={password.currentPassword || ''}
                                onChange={
                                    (e) => setPassword({
                                        ...password, [e.target.name]: e.target.value
                                    })
                                }
                                variant="outlined"
                                fullWidth />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                label="New Password"
                                name='newPassword'
                                type={showNewPassword ? "text" : "password"}
                                id="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" onClick={() => setShowNewPassword(!showNewPassword)} sx={{ cursor: 'pointer' }}>
                                            {showNewPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                                        </InputAdornment>
                                    )
                                }}
                                value={password.newPassword || ''}
                                onChange={
                                    (e) => setPassword({
                                        ...password, [e.target.name]: e.target.value
                                    })
                                }
                                variant="outlined"
                                fullWidth />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "25px 0", width: '100%' }}>
                        <Button variant='contained' color='primary' endIcon={<RiLockPasswordLine />} type='submit'>Reset</Button>
                    </Box>
                </form>
               
            </Container >
        </>
    )
}

export default UpdateDetails
