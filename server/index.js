const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors')
const authenticateJwt = require('./middleware')
const secret = require('./secret')

const app = express();

app.use(express.json());
app.use(cors());


const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: String,
    designation: String,
    gender: String,
    course: String,
    image: String
});

const Admin = mongoose.model('Admin',adminSchema);
const Employee = mongoose.model('Employee', employeeSchema);

mongoose.connect('mongodb+srv://riteshsharma:riteshsharma@cluster0.eovcy.mongodb.net/Employee',{useNewUrlParser: true, useUnifiedTopology: true, dbName: "Employee"})


app.post('/login', async (req,res)=>{
    const {username,password} = req.body;
    const admin = await Admin.findOne({username,password});
    if(admin)
    {
        const token = jwt.sign({username, role: "Admin"}, secret, {expiresIn: '1h'})
        res.status(200).json({message: "Login successful", token});
    }else{
        res.status(403).json({message: "Invalid credentials"})
    }
})

app.get('/me', authenticateJwt, (req,res)=>{
    res.status(200).json({username: req.admin.username})
})

app.get('/employee', authenticateJwt, async (req,res)=>{
    const employee = await Employee.find();
    if(employee)
    {
        res.status(200).json(employee)
    }else{
        res.status(403).json({message: "Server Error"})
    }
})

app.get('/employee/:empId',authenticateJwt, async (req,res)=>{
    const employee = await Employee.findById(req.params.empId);
    if(employee)
    {
        res.status(200).json(employee)
    }else{
        res.status(403).json({message: "Employee does not exists"})
    }
})

app.post('/createEmployee', authenticateJwt, async (req,res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(200).json({message: "Employee created Successfully", empId: employee.id})
})

app.put('/employee/:empId', authenticateJwt, async (req, res)=>{
    const employee = await Employee.findByIdAndUpdate(req.params.empId, req.body, {new: true});
    if(employee)
    {
        res.status(200).json({message: "Employee details updated successfully"});
    }else{
        res.status(403).json({message: "Employee not found"})
    }
})

app.delete('/employee/:empId', authenticateJwt, async(req,res)=>{
    const employee = await Employee.findByIdAndDelete(req.params.empId);
    if(employee)
    {
        res.status(200).json({message: "Employee detail removed successfully"});
    }else{
        res.status(403).json({message: "Employee not found"});
    }

})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})