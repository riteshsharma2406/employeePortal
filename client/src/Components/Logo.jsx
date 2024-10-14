import logo from '../assets/logo-no-background.png'
import {Link} from 'react-router-dom'
function Logo(){
    return <div>
        <Link to="/">
            <img src={logo} alt=""  style={{width: "150px", height: "auto", padding: "10px", marginLeft:"20px"}}/>
        </Link>
    </div>
}

export default Logo;