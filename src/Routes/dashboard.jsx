import { useState } from 'react'
import './module.dashboard.css'
import DashboardUser from '../components/dashboardUser';
import DashboardFolder from '../components/dashboardFolder';
import Form from '../components/form';
import FolderShare from '../components/folderShare';
import { useEffect } from 'react';
function DashboardPage() {
    const [isDarkMode,setIsDarkMode]=useState(false);
    const [dashboardId, setDashboardId] = useState(null);
    const [mode,setMode]=useState('owner');
    const[folderId,setFolderId]=useState(null);
     
    const handleToggle=()=>{
        setIsDarkMode((prevode)=>!prevode);
        document.querySelector('.dashbpoard_page').style.backgroundColor = isDarkMode ? "#fff" : "#121212";
        document.querySelector('.dashbpoard_page').style.color = isDarkMode ? "#000" : "#fff";
    }
    useEffect(() => {
        const preventZoom = (event) => {
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
          }
        };
        document.addEventListener("wheel", preventZoom, { passive: false });
        document.addEventListener("keydown", preventZoom, { passive: false });
        return () => {
          document.removeEventListener("wheel", preventZoom);
          document.removeEventListener("keydown", preventZoom);
        };
      }, []);

    return (
        <div   className="dashbpoard_page">
        <header className='dashboard_page_header'>
            <div className="dashboard_page_header_left">
                <DashboardUser setDashboardId={setDashboardId} setMode={setMode} isDarkMode={isDarkMode} setFolderId={setFolderId}/>
            </div>
            <div className="dashboard_page_header_right">
                <div className='dashboard_page_header_right_theme'>
                    <span>Light</span>
                    <label className='themeSwicth'>
                        <input type='checkbox' checked={isDarkMode} onChange={handleToggle} />
                        <span className='themeSlider'></span>
                    </label>
                    <span>Dark</span>
                </div>
                <FolderShare isDarkMode={isDarkMode} dashboardId={dashboardId} mode={mode}/>

               
            </div>
        </header>

        <div className="dashboard_page_body">
        <div className="dashboard_page_body_top">
            <DashboardFolder dashboardId={dashboardId} mode={mode} setFolderId={setFolderId} isDarkMode={isDarkMode}/>
           
        </div>
        <div className="dashboard_page_body_bottom">
            <Form folderId={folderId} dashboardId={dashboardId} mode={mode} isDarkMode={isDarkMode} />
        </div>
        </div>


        </div>
    )
}

export default DashboardPage
