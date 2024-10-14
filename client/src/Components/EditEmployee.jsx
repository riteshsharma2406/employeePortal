/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function EditEmployee(){
    let {empId} = useParams()

    const [employee,setEmployee] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3000/employee/${empId}`,{
            method:"GET",
            headers: {
                "authorization" : "Bearer " + localStorage.getItem("token")
            }
        }).then((resp)=>{
            resp.json().then((data)=>{
                setEmployee(data)
            })
        })
    },[])

    if(!employee)
    {
        return <div>Loading...</div>
    }

    

    return <div>
        <Typography variant="h5" style={{display:"flex", justifyContent: "center", marginBottom: "20px"}}>Edit Employee</Typography>
               <CardEmployee employee= {employee}/>  
               <UpdateEmployee empId = {empId} employee={employee} setEmployee={setEmployee}/>   
             </div>
}

function CardEmployee(props){
    return <div style={{display:"flex", justifyContent: "center",       margin: "30px"}}>
        <Card style={{display: "flex", justifyContent: "space-between", width: "850px"}}>
                    <div style={{padding: "20px"}}>
                        <p><strong>Unique ID :</strong> {props.employee._id}</p>
                        <p><strong>Full Name :</strong> {props.employee.name}</p>
                        <p><strong>Email :</strong> {props.employee.email}</p>
                        <p><strong>Mobile No. : </strong> {props.employee.mobileNo}</p>
                        <p><strong>Designation : </strong> {props.employee.designation}</p>
                        <p><strong>Gender : </strong> {props.employee.gender}</p>
                        <p><strong>Course : </strong> {props.employee.course}</p>
                        <p><strong>Create Date : </strong>{new Date().toLocaleDateString()}</p>  
                    </div>
                    <div>
                        <img src={props.employee.image} style={{width: "300px", height: "200px", padding: "20px 20px 0 20px"}} alt="" />
                    </div>   
                </Card>
    </div>
}

function UpdateEmployee(props){
    const [name,setName] = useState(props.employee.name);
    const [email, setEmail] = useState(props.employee.email);
    const [mobileNo, setMobileNo] = useState(props.employee.mobileNo);
    const [designation, setDesignation] = useState(props.employee.designation);
    const [gender, setGender] = useState(props.employee.gender);
    const [courses, setCourses] = useState([props.employee.course]);
    const [image, setImage] = useState(props.employee.image)

    const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
        if (checked) {
            setCourses([...courses, value]); 
        } else {
            setCourses(courses.filter(course => course !== value)); 
        }
    };

    return <div>
        
        <form action="" style={{maxWidth:"600px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px"
        }}>
            <div style={{marginBottom:"15px"}}>
                <label style={{display:'block',marginBottom: "5px", fontWeight: "bold"}}><Typography style={{fontWeight: "bold"}}>Name:</Typography></label>
                <input type="text" name="name" required style={{width: '100%', padding: '8px', boxSizing: 'border-box' }}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Email:</Typography></label>
                <input type="email" name="email" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Mobile No:</Typography></label>
                <input type="text" name="mobileNo" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                value={mobileNo}
                onChange={(e)=>{setMobileNo(e.target.value)}}/>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><Typography style={{fontWeight: "bold"}}>Designation:</Typography></label>
                <select name="designation" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                value={designation}
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
                    <label value={gender}>
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
                        <input type="checkbox" name="course" value="MCA" style={{ marginRight: '5px' }}  onChange={handleCheckboxChange}/>
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
                value={image}
                onChange={(e)=>{setImage(e.target.value)}}/>
            </div>

            <div>
                <Button type="submit" variant="contained" style={{ padding: '10px 20px' }} onClick={(e)=>{
                    e.preventDefault();
                    fetch(`http://localhost:3000/employee/${props.empId}`,{
                        method:"PUT",
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
                    }).then((resp)=>{
                        resp.json(()=>{
                            alert("Employee details updated")
                        })
                    })
                    window.location.reload()
                }}>Update</Button>
            </div>
        </form>
        
    </div>
}


export default EditEmployee;