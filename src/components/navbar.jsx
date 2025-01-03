import './module.navbar.css'
import {pageIcon} from '../data'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
   
    return (<div className='landingPageNavbarContainer'>
        <div className="landingPageNavbar">
           
            <div className='navbarLeftContainer'>
            <img src={pageIcon} alt='logo'/>
            <h6 className='pageIconalt'>FormBot</h6>
            </div>

            <div className='navbarrighttContainer'>
                <p className='navbarSigninBtn' onClick={()=>{navigate('/login')}}>Sign in</p>
                <p className='navbarFormBotBtn'onClick={()=>{navigate('/login')}}>Create a FormBot</p>
            </div>
        </div></div>
    )
}

export default Navbar
