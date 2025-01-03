import './dashboardFolder.css';
import PropTypes from 'prop-types';
import { folderIcon } from '../data';
import { useState, useEffect, useRef } from 'react';
import { getFolderData } from '../../Services';
import { createFolder } from '../../Services'; 
import { deleteIcon } from '../data';
import { deleteFolder } from '../../Services';

function DashboardFolder({ dashboardId, mode, setFolderId, isDarkMode }) {
  
  const [folderName, setFolderName] = useState('');
  const [showFolderPopup, setShowFolderPopup] = useState(false);
  const popupRef = useRef(null);
  const [folderData, setFolderData] = useState([]);
  const [deleteFolderId, setDeleteFolderId] = useState(null);
  const [showDeleteFolderPopup, setShowDeleteFolderPopup] = useState(false);

  const fetchFolderData = async () => {
    try {
      const res = await getFolderData(dashboardId);
      const data = await res.json();
      setFolderData(data);
    } catch (err) {
      console.error('Error fetching folder data:', err);
    }
  };

  useEffect(() => {
    if (dashboardId != null) {
      fetchFolderData();
    }
  },[dashboardId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowFolderPopup(false);
        setShowDeleteFolderPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFolderCreate = async () => {
    try {
      const res = await createFolder(dashboardId, { folderName });
      if (res.status === 200) {
        fetchFolderData();
        setFolderName('');
      } 
      if (res.status === 403) {
        alert("You don't have permission to create a folder in this dashboard");
      }
      if (res.status === 400) {
        alert('Folder name already exists');
      }
    } catch (err) {
      alert('Error in folder creation');
      console.error('Error creating folder:', err);
    }
    setShowFolderPopup(false);
  };

  const handleDeleteClick = async (id) => {
    setDeleteFolderId(id);
    setShowDeleteFolderPopup(true);
  }

  const handleDeleteFolder = async () => {
    try {
      const res = await deleteFolder(dashboardId, deleteFolderId);
      if (res.status === 200) {
        fetchFolderData();
      }
      if (res.status === 404) {
        alert('Folder not found');
      }
      if (res.status === 403) {
        alert('You are not authorized to delete this folder');
      }
    } catch (err) {
      alert('Error deleting folder');
      console.error('Error deleting folder:', err);
    }
    setShowDeleteFolderPopup(false);
  }

  return (
    <>
      <div className='dashboardFolderDesignContainer'>
        <p 
          className={`dashboardFolderDegine ${mode === 'view' ? 'disabled' : ''}`} 
          onClick={() => mode !== 'view' && setShowFolderPopup(!showFolderPopup)}
        >
          <img src={folderIcon} alt='Folder Icon' />&ensp;Create a folder
        </p>
      </div>

      {folderData && folderData.length > 0 && folderData.map((folder, index) => (
        <div key={index}>
     
          <div className='dashboardFolderDegine'  >
            <p   onClick={()=>setFolderId(folder._id)}>
            {folder.folderName} </p>
            {mode !== 'view' && (
              <img 
                src={deleteIcon} 
                className='folderDeleteIcon' 
                onClick={() => handleDeleteClick(folder._id)}
              />
            )}
          
          </div>
        
        </div>
      ))}

      {showFolderPopup && (
        <div 
          className='CreateFolderPopup' 
          ref={popupRef} 
          style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black' }}
        >
          <h1>Create New Folder</h1>
          <input
            type='text'
            name='folderName'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder='Enter folder name'
            style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black' }}
            autoComplete='off'
          />
          <div className='CreatwFolderPopupBtn'>
            <span onClick={handleFolderCreate} id='folderDoneBtn'>Done</span>
            <span id='CreatwFolderPopupDivIcon'>|</span>
            <span onClick={() => { setShowFolderPopup(false); setFolderName(''); }} id='folderCancleBtn'>Cancel</span>
          </div>
        </div>
      )}

      {showDeleteFolderPopup && (
        <div 
          className='DeleteFolderPopup' 
          ref={popupRef} 
          style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black' }}
        >
          <p>Are you sure you want to delete the folder?</p>
          <div className='DeleteFolderPopupBtn'>
            <span onClick={handleDeleteFolder} id='folderDeleteBtn'>Confirm</span>
            <span id='DeleteFolderPopupDivIcon'>|</span>
            <span onClick={() => { setShowDeleteFolderPopup(false); setFolderName(''); }} id='folderCancleBtn'>Cancel</span>
          </div>
        </div>
      )}
    </>
  );
}

DashboardFolder.propTypes = {
  dashboardId: PropTypes.string,
  mode: PropTypes.string.isRequired,
  setFolderId: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default DashboardFolder;
