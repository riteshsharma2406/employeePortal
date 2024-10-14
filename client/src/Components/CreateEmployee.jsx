import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
function CreateEmployee(){

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [designation, setDesignation] = useState('HR');
    const [gender, setGender] = useState('');
    const [courses, setCourses] = useState([]);
    const [image,setImage] = useState("")

    const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
        if (checked) {
            setCourses([...courses, value]); // Add the checked value
        } else {
            setCourses(courses.filter(course => course !== value)); // Remove the unchecked value
        }
    };

    return <div>
        <Typography variant="h5" style={{display:"flex", justifyContent: "center", marginBottom: "20px"}}>Create Employee</Typography>
        <form action="" style={{maxWidth:"600px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px"
        }}>
            <div style={{marginBottom:"15px"}}>
                <label style={{display:'block',marginBottom: "5px", fontWeight: "bold"}}><Typography style={{fontWeight: "bold"}}>Name:</Typography></label>
                <input type="text" name="name" required style={{width: '100%', padding: '8px', boxSizing: 'border-box' }}
                onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Email:</Typography></label>
                <input type="email" name="email" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
                onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Mobile No:</Typography></label>
                <input type="text" name="mobileNo" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} onChange={(e)=>{setMobileNo(e.target.value)}}/>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Designation:</Typography></label>
                <select name="designation" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                onChange={(e)=>setDesignation(e.target.value)}
                >
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Manager">Manager</option>
                </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Gender:</Typography></label>
                <div>
                    <label>
                        <input type="radio" name="gender" value="Male" style={{ marginRight: '5px' }} onChange={(e)=>setGender(e.target.value)}/>
                        Male
                    </label>
                    <label style={{ marginLeft: '15px' }}>
                        <input type="radio" name="gender"  value="Female" style={{ marginRight: '5px' }}
                        onChange={(e)=>setGender(e.target.value)}/>
                        Female
                    </label>
                </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Course:</Typography></label>
                <div>
                    <label>
                        <input type="checkbox" name="course" value="MCA" style={{ marginRight: '5px' }} onChange={handleCheckboxChange}/>
                        MCA
                    </label>
                    <label style={{ marginLeft: '15px' }}>
                        <input type="checkbox" name="course" style={{ marginRight: '5px' }} value="BCA" onChange={handleCheckboxChange}/>
                        BCA
                    </label>
                    <label style={{ marginLeft: '15px' }}>
                        <input type="checkbox" name="course" style={{ marginRight: '5px' }} value="BSC" onChange={handleCheckboxChange}/>
                        BSC
                    </label>
                </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Image:</Typography></label>
                <input type="email" name="email" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
                onChange={(e)=>{setImage(e.target.value)}}/>
            </div>

            <div>
                <Button type="submit" variant="contained" style={{ padding: '10px 20px' }} onClick={(e)=>{
                    e.preventDefault();
                    fetch('http://localhost:3000/createEmployee',{
                        method:"POST",
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            mobileNo: mobileNo,
                            designation: designation,
                            gender: gender,
                            courses: courses,
                            image: image
                        }),
                        headers:{
                            "Content-type": "application/json",
                            "authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    window.location = '/employee'
                }}>Submit</Button>
            </div>
        </form>
        
    </div>
}

export default CreateEmployee;