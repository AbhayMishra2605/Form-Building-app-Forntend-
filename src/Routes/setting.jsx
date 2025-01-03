import "./module.setting.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { editUserMethod } from "../../Services";
import {logoutIcon} from '../data'

function Setting() {
  const navigate = useNavigate();
  const [error, setError] = useState(false); 
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Home");
    }
  }, [navigate]);

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });


  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    newPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field],
    });
  };

  const handleUserEdit = async (e) => {
    e.preventDefault();
    
    if (editFormData.password.length > 0 && editFormData.newPassword.length <= 0) {
      let error = 'Enter the password to change the password';
      setError(error);
      return; 
    }
    if(editFormData.password.length <=0 && editFormData.newPassword.length > 0){
      let error = 'Enter the password to change the password';
      setError(error);
      return; 
    }
  
    setError(false);
   
  
    // Constructing an object to send only non-empty fields to the backend
    const dataToSend = {};
    for (let key in editFormData) {
      if (editFormData[key].length > 0) {
        dataToSend[key] = editFormData[key];
      }
    }

    
  
    try {
      const res = await editUserMethod(dataToSend);
      
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem('token',data.token);
        navigate('/dashboard');
      }  
      else if (res.status === 401) {
        alert("Invalid old password");
      }
    } catch (error) {
      alert("Error in updating user");
      console.log(error);
    }
  
    setEditFormData({
      name: "",
      email: "",
      password: "",
      newPassword: "",
    });
  };
  
  
  const editHandleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/Home');
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
    <div className="editUserPage">
      <div className="editUserPageheader">Settings</div>
      <div className="editUserPageContainer">
        <form onSubmit={handleUserEdit}>
          {/* Name Input */}
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Name"
              className="edituser"
            />
          </div>

          {/* Email Input */}
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Update Email"
              className="edituser"
            />
          </div>

          {/* Password Input */}
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type={passwordVisibility.password ? "text" : "password"}
              name="password"
              value={editFormData.password}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Old Password"
             className={error ? 'editErrorInput' : 'edituser'}   
            />
            <span
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility("password")}
            >
              <FontAwesomeIcon
                icon={passwordVisibility.password ? faEyeSlash : faEye}
              />
            </span>
          </div>

          {/* New Password Input */}
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              name="newPassword"
              value={editFormData.newPassword}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="New Password"
              className={error ? 'editErrorInput' : 'edituser'}            />
            <span
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              <FontAwesomeIcon
                icon={passwordVisibility.newPassword ? faEyeSlash : faEye}
              />
            </span>
            
          </div>
          <div
              style={{
                color: "red",
                height: "1.5vw",
                fontSize: "1.2vw",
                
              }}
            >
              {error}
            </div>
          <button type="submit" className="UpdateBtn">Update</button>
        </form>
      </div>
      <div className="settingLogOutBtn" onClick={editHandleLogout}><img src={logoutIcon}/>&ensp;Log Out</div>
    </div>
  );
}

export default Setting;
