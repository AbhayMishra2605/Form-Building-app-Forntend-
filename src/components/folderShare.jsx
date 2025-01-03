import { useState, useRef, useEffect } from "react";
import "./module.folderShare.css";
import { inviteUserByEmail } from "../../Services";
import PropTypes from "prop-types";
import { inviteUsingLink } from "../../Services";

function FolderShare({ isDarkMode, dashboardId,mode }) {
  const [formData, setFormData] = useState({
    email: "",
    dashboardId: dashboardId,
    mode: "Edit",
  });
  

  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

 
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      dashboardId: dashboardId,  
    }));
  }, [dashboardId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendInvite = async () => {
    console.log("Sending data to backend:", formData);
    const response = await inviteUserByEmail(formData);
    try {
      if (response.status === 200) {
        alert("Dashboard shared successfully");
      }
      if (response.status === 400) {
        alert("User already has access to the dashboard");
      }
      if (response.status === 404) {
        alert("User not found");
      }
    } catch (err) {
      alert("Error in sharing dashboard");
      console.error(err);
    }
    setFormData((prevData) => ({
      ...prevData,
      email: "",
    }));
    setShowPopup(false);
  };

  const handleCopyLink = async() => {
    const response = await inviteUsingLink(formData);
    const link=await response.json();
    
    try {
      if (response.status === 200) {
        navigator.clipboard.writeText(link.inviteLink);
        alert("Link copied to clipboard");
      }
      if(response.status===404){
        alert("Dsaahboard not found");
      }
    } catch (err) {
      alert("Error in copying link");
      console.error(err);
    }
    
    
  };

  const handleModeChange = (newMode) => {
    setFormData((prevData) => ({
      ...prevData,
      mode: newMode,
    }));
    setShowOptions(false);
  };

  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
     
      <div className="dashboard_page_header_right_share">
      <button 
    onClick={() => setShowPopup(true)} 
    disabled={mode !== "owner"} 
    
  >
    Share
  </button>
      </div>

     
      {showPopup && (
        <div
          className="modal-container"
          ref={popupRef}
          style={{
            backgroundColor: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
          }}
        >
          <div className="modal-content">
            <div className="closeInvitePopupBtn" onClick={() => setShowPopup(false)}>
              X
            </div>
            <div className="invite-header">
              <h3 className="invite-headerText">Invite by Email</h3>
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="dropdown-btn"
                  onClick={() => setShowOptions(!showOptions)}
                  style={{
                    backgroundColor: isDarkMode ? "black" : "white",
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {formData.mode} ▼
                </button>
                {showOptions && (
                  <ul className="dropdown-menu">
                    <li onClick={() => handleModeChange("Edit")}>Edit</li>
                    <li onClick={() => handleModeChange("View")}>View</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="email-container">
              <input
                type="email"
                name="email"
                placeholder="Enter email id"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
            <button className="send-invite" onClick={handleSendInvite}>
              Send Invite
            </button>

            <h3>Invite by Link</h3>
            <button className="copy-link" onClick={handleCopyLink}>
              Copy link
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Prop validation
FolderShare.propTypes = {
  isDarkMode: PropTypes.bool,
  dashboardId: PropTypes.string
};

export default FolderShare;
