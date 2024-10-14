import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
function Login(){

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    return <div style={{
        display: 'flex',
        justifyContent: "center"
    }}>
        <Card variant="outlined" style={{
            display:"flex",
            flexDirection:'column',
            padding: "20px",
            width: "350px"
        }}>
            <Typography variant='h6' gutterBottom style={{marginBottom: "20px", justifyContent: "center", display: "flex"}}>Welcome Back</Typography>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>{setEmail(e.target.value)}}  style={{marginBottom: "10px"}}/>
            <TextField id="outlined-password-input" label="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}  style={{marginBottom: "20px"}}/>
            <Button variant="contained" style={{
                display: "flex",width: "100px",marginBottom: "10px"
            }}
                onClick={()=>{
                    fetch('http://localhost:3000/login',{
                        method: "POST",
                        body: JSON.stringify({
                            username: email,
                            password: password
                        }),
                        headers: {
                            "Content-type":"application/json"
                        }
                    }).then((res)=>{
                        res.json().then((data)=>{
                            localStorage.setItem("token",data.token);
                            window.location = "/";
                        })
                    })
                }}
            >Login</Button>

        </Card>
    </div>
}

export default Login;