import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
function Navbar(){

    const [userEmail, setUserEmail] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/me', {
            method: "GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp)=>{
            resp.json().then((data)=>{
                if(data.username)
                {
                    setUserEmail(data.username)
                }
            })
        })
    },[])

    if(userEmail)
    {

        return <div style={{display: "flex", justifyContent: 'space-between', padding: "20px"}}>
            <div>
                <Link to="/">
                    <Button variant="text" style={{marginRight: "10px"}}>Home</Button>
                </Link>
                <Link to="/employee">
                    <Button variant="text" style={{marginLeft: "10px"}}>Employee</Button>
                </Link>
                <Link to="/createEmployee">
                    <Button variant="text" style={{marginLeft: "10px"}}>Create Employee</Button>
                </Link>
            </div>
            <div style={{display:"flex", gap: "50px"}}>
                <Typography>{userEmail}</Typography>
                <Link>
                 <Button variant="contained" onClick={()=>{
                    window.location="/"
                        localStorage.setItem("token", null)
                    }}>logout</Button>
                </Link>
            </div>
        </div>
    }

    return <div style={{display: "flex", justifyContent: 'space-between', padding: "20px"}}>
        <div>
            <Link to="/">
                <Button variant="text">Home</Button>
            </Link>
        </div>
        <div style={{display: "flex", gap: "10px"}}>
            <Link to='login'>
                <Button variant="contained">Login</Button>
            </Link>
        </div>
    </div>
}

export default Navbar;