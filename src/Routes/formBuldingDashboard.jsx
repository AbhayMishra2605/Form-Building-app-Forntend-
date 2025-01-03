import './module.formBuldingDshboard.css';
import { useState ,useEffect} from 'react';
import { textIcon, photoIcon, videoIcon, gifIcon, inputBtnIcon, inputDateIcon, inputEmailIcon, inputNumberIcon, flagIcon, inputPhoneIcon, inputRatingIcon, inputTextIcon } from '../data';
import IamgeComponent from '../components/formfolder/iamge';
import TextBubble from '../components/formfolder/text';
import InputText from '../components/formfolder/inputText';
import InputNumber from '../components/formfolder/inputNumber';
import InputBtn from '../components/formfolder/inputBtn';
import InputEmail from '../components/formfolder/inputEmail';
import InputPhone from '../components/formfolder/inputPhone';
import InputRating from '../components/formfolder/inputRating';
import InputDate from '../components/formfolder/inputDate';
import {flagWhiteIcon, deleteIcon } from '../data';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { createForm } from '../../Services';


function FormBuldingDashboard() {
  
    const [form, setForm] = useState({
        formName:'',
        components:[]

    }
        
    );
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [formDashboardId, setFormDashboardId] = useState(null);
    const [formFolderId, setFormFolderId] = useState(null);
    const navigate = useNavigate();
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encryptedData = queryParams.get('data');
    useEffect(() => {
    if (encryptedData) {
        // Get secret key from environment variables
        const secretKey = import.meta.env.VITE_SECRET_KEY;
    
        // Decrypt the data
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
        
    
        const { dashboardId, folderId } = decryptedData;
       
        setFormDashboardId(dashboardId);
        setFormFolderId(folderId);
        
    }
    }, [encryptedData]);

   
  
    useEffect(() => {
        if (!localStorage.getItem('token')) {
           navigate('/')
        }
    }, []);
   



const handleToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
        document.querySelector('.FormBuldingDashboard').style.backgroundColor = isDarkMode ? "#fff" : "#121212";
        document.querySelector('.FormBuldingDashboard').style.color = isDarkMode ? "#000" : "#fff";
    };

    // Add Image Component to the form body dynamically
    const addImageComponent = () => {
        const newComponent = { componentType: 'Image', componentData: '' };
        setForm(prevForm => ({
            ...prevForm,
            components: [...prevForm.components, newComponent]
        }));
    };
    

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
    
    const addTextComponent=()=>{
        const newTextComponent={componentType:'Text',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newTextComponent]}
            ));
    }
    const addInputTextComponent=()=>{
        const newInputTextComponent={componentType:'InputText',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputTextComponent]}
            ));
    };
    const addInputNumberComponent=()=>{
        const newInputComponent={componentType:'InputNumber',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));
    };
    const addInputEmailComponent=()=>{
        const newInputComponent={componentType:'InputEmail',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));
    };
    const addInputPhoneComponent=()=>{
        const newInputComponent={componentType:'InputPhone',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));
    };
    const addInputRatingComponent=()=>{
        const newInputComponent={componentType:'InputRating',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));
    };
    const addInputDateComponent=()=>{
        const newInputComponent={componentType:'InputDate',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));
    };
    const addInputButtonComponent=()=>{
        const newInputComponent={componentType:'SubmitButton',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));
    };
    const deleteComponent = (id) => {
        const updatedComponents = form.components.filter((_, index) => index !== id);
        setForm({ ...form, components: updatedComponents });
    };
    const handleSave=async()=>{
        
        const response=await createForm(formDashboardId,formFolderId,form);
        try{
            if(response.status===200){
                alert('Form saved successfully');
                
                setForm({formName:'',components:[]});
            }if(response.status===409){
                alert('Form already exist');
            }
        }catch(err){
            console.log(err);
        }
        
    }

    const handleCancleBtn=()=>{
        navigate('/dashboard')
    }

    return (
        <div className='FormBuldingDashboard'>
            <header className='FormBuldingDashboardHeader'>
                <div className='headerinput'>
                    <input type='text' name='formName' value={form.formName} onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}} placeholder='Enter Form Name' className='formName' autoComplete='off' required={true}/>
                </div>
                <div className='headerNavigateBtn'>
                    <p className='flowBtn'>Flow</p>
                    <p className='responseBtn'>Response</p>
                </div>

                <div className='headerBtn'>
                    <div className='SharedDashboard_page_header_right_theme'>
                        <span>Light</span>
                        <label className='sharedThemeSwicth'>
                            <input type='checkbox' checked={isDarkMode} onChange={handleToggle} />
                            <span className='sharedThemeSlider'></span>
                        </label>
                        <span>Dark</span>
                    </div>
                    <button className='saveBtn' onClick={()=>alert('Please go to the dashboard and select form to share.')}>Share</button>
                    <button className='shareBtn' onClick={handleSave}  disabled={form.components.length === 0}>Save</button>
                    
                    <p className='canclBtn' onClick={handleCancleBtn}>X</p>
                </div>
            </header>

            <div className='formDashboardBody'>
                <div className='formDashboardBodyLeft'>
                    <h3 className='bubble'>Bubble</h3>
                    <div className='formBubble'>
                        <p className='bubbleText'onClick={addTextComponent}><img src={textIcon} />&ensp;Text</p>
                        <p className='BubbleImage' onClick={addImageComponent}><img src={photoIcon} />&ensp;Image</p>
                        <p className='BubbleVideo' ><img src={videoIcon} />&ensp;Video</p>
                        <p className='BubbleGif'><img src={gifIcon} />&ensp;GIF</p>
                    </div>
                    <div className='formInput'>
                        <h3 className='input'>Input</h3>
                        <p className='inputText' onClick={addInputTextComponent}><img src={inputTextIcon} />&ensp;Text</p>
                        <p className='inputNumber' onClick={addInputNumberComponent}><img src={inputNumberIcon} />&ensp;Number</p>
                        <p className='inputEmail' onClick={addInputEmailComponent}><img src={inputEmailIcon} />&ensp;Email</p>
                        <p className='inputPhone' onClick={addInputPhoneComponent}><img src={inputPhoneIcon} />&ensp;Phone</p>
                        <p className='inputDate' onClick={addInputDateComponent}><img src={inputDateIcon} />&ensp;Date</p>
                        <p className='inputRating' onClick={addInputRatingComponent}><img src={inputRatingIcon} />&ensp;Rating</p>
                        <p className='inputButton' onClick={addInputButtonComponent}><img src={inputBtnIcon} />&ensp;Button</p>
                    </div>
                </div>
                <div className='formDashboardBodyRight'>
                    <div className='flagStart'><img src={isDarkMode ? flagIcon : flagWhiteIcon} />&ensp;Start</div>
                    {/* Render dynamically added comp here */}
                    {form.components.map((component, index) => {
    if (component.componentType === 'Image') {
        return (
            <div key={index}>
                <img 
                    src={deleteIcon} 
                    className='deleteComponent' 
                    onClick={() => deleteComponent(index)} 
                />
                <IamgeComponent id={index} form={form} setForm={setForm} />
            </div>
        );
    }
    if (component.componentType === 'Text') {
        return (
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent'
            onClick={() => deleteComponent(index)}
            />
            <TextBubble id={index} form={form} setForm={setForm} />
            </div>
            );
            }
    if(component.componentType === 'InputText'){
        return(
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent'
            onClick={() => deleteComponent(index)}
            />
            <InputText/>
            </div>
            );
            }
    if(component.componentType === 'InputNumber'){
        return(
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent'
            onClick={() => deleteComponent(index)}
            />
            <InputNumber/>
            </div>
        );
    }
    if(component.componentType === 'InputEmail'){
        return(
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent'
            onClick={() => deleteComponent(index)}
            />
            <InputEmail/>
            </div>
        );
    }
    if(component.componentType === 'InputPhone'){
        return(
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent'
            onClick={() => deleteComponent(index)}
            />
            <InputPhone/>
            </div>
        );
    }
    if(component.componentType === 'InputDate'){
        return(
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent'
            onClick={() => deleteComponent(index)}
            />
            <InputDate/>
            </div>
        );
    }
   
    if(component.componentType === 'InputRating'){
        return(
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent' 
            onClick={() => deleteComponent(index)}
            />
            <InputRating/>
            </div>
        );
    }
    if(component.componentType === 'SubmitButton'){
        return(
            <div key={index}>
            <img
            src={deleteIcon}
            className='deleteComponent'
            onClick={() => deleteComponent(index)}
            />
            <InputBtn/>
            </div>
        );
        }


    
    return null; // Handle other component types
})}



                   

                </div>
            </div>
            
        </div>
    );
}

export default FormBuldingDashboard;