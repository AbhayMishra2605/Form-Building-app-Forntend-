import './module.form.css'
import { useEffect,useState } from 'react'
import { getFormData } from '../../Services'
import { deleteIcon } from '../data'
import { useRef } from 'react'
import './dashboardFolder.css'
import PropTypes from 'prop-types';
import { deleteForm } from '../../Services'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'


function Form({folderId,dashboardId,mode,isDarkMode}) {
    
    
    const [formData, setFormData] = useState([])
    const [showDeleteFormPopup, setshowDeleteFormPopup] = useState(false);
    const [deleteFormId, setdeleteFormId] = useState(null);
    const popupRef = useRef(null);
    const navigate = useNavigate()
    
    const fetchFormData = async () => {
        
        const response = await getFormData(dashboardId,folderId)
        const data = await response.json()
        try{
            if(response.status === 200){
                
                setFormData(data.forms)
                
            }

        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        
        //if the folderId is not null
        if(folderId){
            fetchFormData()
        }
        
        
    },[folderId])




    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setshowDeleteFormPopup(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const handleDeleteClick = async (id) => {
        setdeleteFormId(id);
        setshowDeleteFormPopup(true);
      }

         const handleDeleteForm = async () => {
             try {
                 const response = await deleteForm(dashboardId, folderId,deleteFormId)
                 
               
                 if (response.status === 200) {
                   fetchFormData()
                }else{
                    console.log(response.status)
                    }
            }
           catch (err) {
               console.log(err)
           }
             setshowDeleteFormPopup(false)
         }

         const handleCreateForm = () => {
            if (mode !== 'view') {
                const secretKey = import.meta.env.VITE_SECRET_KEY;
                const data = JSON.stringify({ dashboardId, folderId}); // Combine data
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

    // Navigate with encrypted data in query parameter
    navigate(`/dashboard/formBuilder?data=${encodeURIComponent(encryptedData)}`);
            }
         }

    const handleFormUpdate = (fromId) => {
       
            const secretKey = import.meta.env.VITE_SECRET_KEY;
            const data = JSON.stringify({ dashboardId, folderId,mode,fromId}); // Combine data
const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

// Navigate with encrypted data in query parameter
navigate(`/dashboard/formUpdating?data=${encodeURIComponent(encryptedData)}`);
        
    }

    return (
        <div className='formContainer'>
            <div 
                className={`formCreateContainer ${mode === 'view' ? 'disabled' : ''}`} 
                onClick={()=>{handleCreateForm()}}
                 
            >
                <p className='AddIcon'>+</p>
                <p className='formCreateMassage'>Create a typebot</p>
            </div>

        
        {formData && formData.length>0 && formData.map((data,index) => {
            return (
                <div key={index} className='formContainerData'>
                    <img 
                        src = {deleteIcon} 
                        className={`formDeleteIcon ${mode === 'view' ? 'disabled' : ''}`} 
                        onClick={()=> mode !== 'view' && handleDeleteClick(data._id)}
                    />
                    <div className='formDataContainer' onClick={()=>handleFormUpdate(data._id)}>
                        <p className='formCreateMassage'>{data.formName}</p>
                    </div>
                </div>
            )
        })
        }


            {showDeleteFormPopup && (
        <div 
          className='DeleteFolderPopup' 
          ref={popupRef} 
          style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black' }}
        >
          <p>Are you sure you want to delete the form?</p>
          <div className='DeleteFolderPopupBtn'>
            <span onClick={handleDeleteForm} id='folderDeleteBtn'>Confirm</span>
            <span id='DeleteFolderPopupDivIcon'>|</span>
            <span onClick={() => { setshowDeleteFormPopup(false);  }} id='folderCancleBtn'>Cancel</span>
          </div>
        </div>
      )}  
        </div>
    )
}

// prop validation
Form.propTypes = {
    formData: PropTypes.arrayOf(PropTypes.object),
    handleDeleteForm: PropTypes.func,
    showDeleteFormPopup: PropTypes.bool,
    isDarkMode: PropTypes.bool,
    folderId: PropTypes.string,
    dashboardId: PropTypes.string,
    mode: PropTypes.string.isRequired,
}

export default Form;
