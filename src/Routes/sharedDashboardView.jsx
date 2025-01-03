import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validateInviteLink } from "../../Services";
import './module.sharedDashboard.css';
import DashboardFolder from '../components/dashboardFolder';
import Form from '../components/form';
import { getUserDashboardById } from "../../Services";


const SharedDashboardView = () => {

  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate(); // For redirection
  const [dashboardInfo, setDashboardInfo] = useState(null); // Dashboard data state
  const [mode, setMode] = useState(""); 
  const [isDarkMode,setIsDarkMode]=useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [folderId, setFolderId] = useState(null); // Folder ID state
 // check if user is not logedin go to landing page
 useEffect(() => {
  if (!localStorage.getItem('token')) {
    navigate('/');
  }
}, [navigate]);
  useEffect(() => {
    const validateInvite = async () => {
      try {
        // Fetch validation result from backend
        const response = await validateInviteLink(token);

        if (!response.ok) {
          throw new Error("Failed to validate token");
        }

        const data = await response.json();
       

        if (data.valid) {
          setDashboardInfo(data.dashboard); 
          setFolderId(data.dashboard._id);
          if(data.mode ==='View'){
            setMode('view');
          }
        } else {
          alert("Invalid invite link!");
          navigate("/"); 
        }
      } catch (error) {
        console.error("Validation error:", error);
        alert("Invalid or expired invite link!");
        navigate("/");
      }
    };

    validateInvite();
  }, [token, navigate]);
 

  const fetchDashboards = async () => {
    try {
      
      const response = await getUserDashboardById(dashboardInfo._id);
      const data = await response.json();
     
      if (response.status === 200) {
      
        setSelectedOwner(data.ownerName);
      }
    }
  
      catch (err) {
          alert("error");
          console.error(err);
      }
  };


  useEffect(() => {
   if(dashboardInfo!==null){
    fetchDashboards();}
  });






const handleToggle=()=>{
    setIsDarkMode((prevode)=>!prevode);
    document.querySelector('.sharedDashboardPage').style.backgroundColor = isDarkMode ? "#fff" : "#121212";
    document.querySelector('.sharedDashboardPage').style.color = isDarkMode ? "#000" : "#fff";
}



  return (
    <div>
      {dashboardInfo ? (
    <div className="sharedDashboardPage">

        <header className='sharedDashboard_page_header'>
                    <div className="sharedDashboard_page_header_left">
                        <div className='sharedDashboardUser'>
                            <span>{selectedOwner}&#39;s workspace</span>
                        </div>
                    </div>
                    <div className="sharedDashboard_page_header_right">
                        <div className='SharedDashboard_page_header_right_theme'>
                            <span>Light</span>
                            <label className='sharedThemeSwicth'>
                                <input type='checkbox' checked={isDarkMode} onChange={handleToggle} />
                                <span className='sharedThemeSlider'></span>
                            </label>
                            <span>Dark</span>
                        </div>
                    </div>
                </header>




                <div className="dashboard_page_body">
        <div className="dashboard_page_body_top">
            <DashboardFolder dashboardId={dashboardInfo._id} mode={mode} setFolderId={setFolderId} isDarkMode={isDarkMode}/>
           
        </div>
        <div className="dashboard_page_body_bottom">
            <Form folderId={folderId} dashboardId={dashboardInfo._id} mode={mode} />
        </div>
        </div>




    </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SharedDashboardView;
