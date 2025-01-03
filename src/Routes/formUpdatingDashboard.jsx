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
import { updateFormById } from '../../Services';
import { getFormDataById } from '../../Services';
import { shareFormByLink } from '../../Services';

function FormUpdatingDashboard() {
    const [form, setForm] = useState({
        formName:'',
        components:[]

    }
        
    );
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [formDashboardId, setFormDashboardId] = useState(null);
    const [formFolderId, setFormFolderId] = useState(null);
    const [formId, setFormId] = useState(null);
    const [mode, setMode] = useState(null);
    const [linkCopied, setLinkCopied] = useState(false);
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
    
        
    
        const { dashboardId, folderId, mode , fromId } = decryptedData;
       
       setFormId(fromId);
        setMode(mode);
        setFormDashboardId(dashboardId);
        setFormFolderId(folderId);
        
    }
    }, [encryptedData]);

   const fetchFormDataById = async () => {
    const response = await getFormDataById(formDashboardId, formFolderId, formId);
    const data = await response.json();
    try {
        if (response.status === 200) {
            setForm(data.form);
        }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        
        if (formId) {
           
            fetchFormDataById();
        }
    }, [formId]);
    
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
        if(mode !== 'view'){
        const newComponent = { componentType: 'Image', componentData: '' };
        setForm(prevForm => ({
            ...prevForm,
            components: [...prevForm.components, newComponent]
        }));}
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
        if(mode !== 'view'){
            
        const newTextComponent={componentType:'Text',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newTextComponent]}
            ));}
    }
    const addInputTextComponent=()=>{
        if(mode !== 'view'){
        const newInputTextComponent={componentType:'InputText',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputTextComponent]}
            ));
        }
    };
    const addInputNumberComponent=()=>{
        if(mode !== 'view'){
        const newInputComponent={componentType:'InputNumber',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));}
    };
    const addInputEmailComponent=()=>{
        if(mode !== 'view'){
        const newInputComponent={componentType:'InputEmail',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));}
    };
    const addInputPhoneComponent=()=>{
        if(mode !== 'view'){
        const newInputComponent={componentType:'InputPhone',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));}
    };
    const addInputRatingComponent=()=>{
        if(mode !== 'view'){
        const newInputComponent={componentType:'InputRating',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));}
    };
    const addInputDateComponent=()=>{
        if(mode !== 'view'){
        const newInputComponent={componentType:'InputDate',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));}
    };
    const addInputButtonComponent=()=>{
        if(mode !== 'view'){
        const newInputComponent={componentType:'SubmitButton',componentData:''};
        setForm(prevForm=>({...prevForm,components:[...prevForm.components,newInputComponent]}
            ));}
    };
    const deleteComponent = (id) => {
        if(mode !== 'view'){
        const updatedComponents = form.components.filter((_, index) => index !== id);
        setForm({ ...form, components: updatedComponents });}
    };
    const handleSave=async()=>{
        if(mode !== 'view'){
        const response = await updateFormById(formDashboardId, formFolderId, formId, form);
        try{
            if(response.status===200){
                alert('Form Updated successfully');
             
              fetchFormDataById();
                }
        }catch(err){
            console.log(err);
        }}
    }
        
    

    const handleCancleBtn=()=>{
        navigate('/dashboard')
    }
    const handleFormSharing = async() => {
        if(mode !== 'view'){
        const response = await shareFormByLink(formDashboardId, formFolderId, formId);
        const data = await response.json();
        try {
            if (response.status === 200) {
                navigator.clipboard.writeText(data.shareLink);
                setLinkCopied(true);
                setTimeout(() => {
                    setLinkCopied(false);
                    }, 500);
                
            }
            } catch (err) {
                console.log(err);
            }}
            }

    const handleResponseBtn =()=>{
        const secretKey = import.meta.env.VITE_SECRET_KEY;
                    const data = JSON.stringify({ formDashboardId, formFolderId, mode , formId }); //
        const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
        
        // Navigate with encrypted data in query parameter
        navigate(`/form/responses-dashboard?data=${encodeURIComponent(encryptedData)}`);
    }


    return (
        <div className='FormBuldingDashboard'>
            <header className='FormBuldingDashboardHeader'>
                <div className='headerinput'>
                    <input type='text' name='formName' value={form.formName} onChange={(e)=>{setForm({...form,[e.target.name]:e.target.value})}} placeholder='Enter Form Name' className='formName' autoComplete='off' required={true}/>
                </div>
                <div className='headerNavigateBtn'>
                    <p className='flowBtn'>Flow</p>
                    <p className='responseBtn' onClick={handleResponseBtn}>Response</p>
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
                    <button className='saveBtn' onClick={handleFormSharing}>Share</button>
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
           {linkCopied && <div className='LinkedCopped'>Link copied </div>
           } 
        </div>
    );
}



export default FormUpdatingDashboard
