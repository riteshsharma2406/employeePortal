import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';

function Home(){
    return <div style={{display: "flex", justifyContent: "center"}}> 
        <Card variant="outlined" style={{display: "flex", justifyContent:"center",
            padding: "50px",
            width: "500px",
            margin: "100px",
            backgroundColor: "#ff6347",
            boxShadow: "0px 1px 66px -10px rgba(255,99,71,1)"
        }}>
            <Typography variant='h4'>Welcome to Admin Panel</Typography>
        </Card>
    </div>
}

export default Home;