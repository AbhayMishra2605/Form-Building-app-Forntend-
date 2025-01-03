import { useEffect, useState, useRef } from 'react';
import { getUserDashboard } from '../../Services';
import './module.dashboardUser.css';
import { dropicon } from '../data';
import PropTypes from 'prop-types';
import { dropIconLast } from '../data';
import { useNavigate } from 'react-router-dom';

function DashboardUser({ setDashboardId, setMode ,isDarkMode,setFolderId}) {
  const [dashboard, setDashboard] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await getUserDashboard();
        const data = await response.json();
        if (response.status === 200) {
          setDashboard(data);
          
          setDashboardId(data.ownDashboardId);
          setFolderId(data.ownDashboardId);
          setSelectedOwner(data.ownerName); 
        }
      } catch (err) {
        console.error('Error fetching dashboards:', err);
      }
    };

    fetchDashboards();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/Home');
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); 
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Home');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOwnerSelect = (ownerName) => {
    setSelectedOwner(ownerName); 
    setDashboardId(dashboard.ownDashboardId); 
    setFolderId(dashboard.ownDashboardId); 
    setMode('owner');
    setDropdownOpen(false); 
  };

  const handleSharedOwnerSelect = (ownerName, dashboardId, modes) => {
    setSelectedOwner(ownerName);
    const mode = modes[0];
    setMode(mode);
    setDashboardId(dashboardId);
    setFolderId(dashboardId);
    setDropdownOpen(false); 
  };

  const handleSetting = () => {
    navigate('/editUser');
  };

  return (
    <>
      {dropdownOpen ? (
        <div ref={dropdownRef} className="dashboardUser-containerDrop">
          <div className="dashboardUser-containerDropItem"  style={{backgroundColor: isDarkMode ? "#121212" : "#fff", color: isDarkMode ? "#fff" : "#000"}}>
            {dashboard && (
              <div
                className="DashboardUserNameList"
                onClick={() => handleOwnerSelect(dashboard.ownerName)}
              >
                {dashboard.ownerName}&#39;s workspace
                <img src={dropIconLast} alt="Icon" />
              </div>
            )}
          </div>
          {dashboard && dashboard.sharedDashboards.length > 0 && (
           
              <div className="DashboardUserNameList">
                {dashboard.sharedDashboards.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleSharedOwnerSelect(item.ownerName, item.id, item.modes)
                    }
                  > 
                <div className="dashboardUser-containerDropItemUser" style={{backgroundColor: isDarkMode ? "#121212" : "#fff", color: isDarkMode ? "#fff" : "#000"}}>

                  
                    {item.ownerName}&#39;s workspace</div>
                  </div>
                ))}
              </div>
            
          )}
          <div className="dashboardUser-containerDropItem" style={{backgroundColor: isDarkMode ? "#121212" : "#fff", color: isDarkMode ? "#fff" : "#000"}}>
            <div className="dropdown-item" onClick={handleSetting}>
              Settings
            </div>
          </div>
          <div className="dashboardUser-containerDropItem"style={{backgroundColor: isDarkMode ? "#121212" : "#fff"}}>
            <div className="dropdown-itemlogout" onClick={handleLogout}>
              Log Out
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboardUser-container">
          {dashboard && (
            <div className="DashboardUserName" onClick={() => toggleDropdown()}>
              {selectedOwner}&#39;s workspace
              <img src={dropicon} alt="Icon" />
            </div>
          )}
        </div>
      )}
    </>
  );
}

DashboardUser.propTypes = {
  setDashboardId: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  setFolderId: PropTypes.func.isRequired,
};

export default DashboardUser;
