/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
function Employee(){

    const [employees,setEmployees] = useState([]);
    const [error,setError] = useState(null)

    useEffect(()=>{
        const fetchEmployee = async () => {
            try{
                const response = await fetch('http://localhost:3000/employee',{
                    method: "GET",
                    headers:{
                        "authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if(!response.ok)
                {
                    throw new Error(`HTTP error! status ${response.status}`)
                }

                const data = await response.json();
                setEmployees(data)
            }catch(err){
                console.error(`Error fetching employees: `, err);
                setError(err.message)
            }
        }
        fetchEmployee();
    },[])

    if(error)
    {
        return <div>Error: {error} </div>
    }

    return <div>
        <h2 style={{display: "flex", justifyContent: "center"}}>Employee Directory</h2>
        {employees.map(employee => {
            return <EmployeeCard employee = {employee}  setEmployees = {setEmployees}/>
        })}
    </div>
}

export function EmployeeCard(props){
    const navigate = useNavigate();

    return <div style={{display:"flex", justifyContent: "center", margin: "30px"}}>
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
                <div style={{display: "flex", justifyContent: "center", padding: "20px", gap: "20px"}}>
                    
                        <Button variant="contained" onClick={()=>{navigate("/employee/" + props.employee._id)}}>Edit</Button>
                    
                    <Button variant="contained" onClick={()=> {
                        fetch("http://localhost:3000/employee/" + props.employee._id ,{
                            method: "DELETE",
                            headers: {
                                "authorization" : "Bearer " + localStorage.getItem("token")
                            }
                        }).then((resp)=>{
                            if(resp.ok)
                            {
                                const UpdateEmployee = props.employees.filter(employee => employee.id != props.employees._id);
                                props.setEmployees(UpdateEmployee)
                            }
                        })
                        window.location.reload();
                    }}>Delete</Button>
                </div>
            </div>
            
        </Card>
    </div>
}



export default Employee;