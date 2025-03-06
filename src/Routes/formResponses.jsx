import './module.formResponses.css'
import './module.formBuldingDshboard.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'; 
import { useLocation } from 'react-router-dom';
import { formResponcesData } from '../../Services';
import { calenderIcon } from '../data';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


function FormResponses() {
    const navigate=useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [formId,setFormId]=useState(null);
    const [views,setViews]=useState(0);
    const [starts , setStarts] = useState(0);
    const [isLoading,setIsLoading]=useState(true);
    const [isDelayed, setIsDelayed] = useState(false);
    const [tableHeader,setTableHeader]=useState(null);
    const [tableData,setTableData]=useState(null);
    const [submittedAt, setSubmittedAt]=useState([]);
     const [mode, setMode] = useState(null);
    const COLORS = ['#888888', '#0088FE'];
    
    useEffect(() => {
        if (!localStorage.getItem('token')) {
           navigate('/')
        }
    }, []);

    const fetchFormData=async()=>{
        try{
        const res = await formResponcesData(formId);
        const data = await res.json();
        
        data.allResponses.map((item,index)=>{
            setSubmittedAt(pev=>[...pev,item.submittedAt])
            
        })
        setTableData(data.allResponsesData)
         
       setTableHeader(data.componentTypes);
        setViews(data.views);
        setStarts(data.responseCount);
        }
        catch(err){
            console.log(err);
            }
    }
    useEffect(()=>{
        if(formId !== null){
            fetchFormData();
        }
    },[formId])

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
        
            
        
            const {  formId,mode } = decryptedData;
            setMode(mode);
           
           setFormId(formId);
          
            
        }
        }, [encryptedData]);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
    
            return () => clearTimeout(timer); // Cleanup on unmount
        }, []);

        useEffect(() => {
            const delayTimer = setTimeout(() => {
                setIsDelayed(true);
            }, 1000);
    
            return () => clearTimeout(delayTimer); // Cleanup on unmount
        }, []);

    const handleToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
        document.querySelector('.formResponseDashboard').style.backgroundColor = isDarkMode ? "#fff" : "#121212";
        document.querySelector('.formResponseDashboard').style.color = isDarkMode ? "#000" : "#fff";
    };
   

    const data = [ { name: 'Group A', value: views }, { name: 'Group B', value: starts }, ];
    const complete = Math.round((starts * 100) / views);      
    return (
        <div className='formResponseDashboard'>
            {isDelayed ? (
                <>
                    <header className='FormBuldingDashboardHeader'>
                        <div className='formNavigateBtn'>
                            <div className='formheaderNavigateBtn'>
                                <p className='formFlowBtn' onClick={()=>navigate(-1)}>Flow</p>
                                <p className='formResponseBtn' >Response</p>
                            </div>
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
                            <button className='saveBtn' >Share</button>
                            <button className='shareBtn' >Save</button>
                            <p className='canclBtn' onClick={()=>navigate(-1)}>X</p>
                        </div>
                    </header>
                    
                    {starts > 0 ? (<>
                        <div className='formResponseDashboardStatsContainer'>
                            <div className='views'>Views<br/>{views}</div>
                            <div className='stats'>Starts<br/>{starts}</div>
                        </div>
                        
                        <div className='formResponseData'>
                        <table className="responseTable">
  <thead>
    <tr>
      <th>S.No</th>
      <th>
        <img src={calenderIcon} className="calendarIcon" alt="Calendar Icon" />
        &ensp;Submitted at
      </th>
      {tableHeader.map((header, index) => (
        <th key={index}>{header.componentType}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {tableData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        <td>{rowIndex+1 }</td>
        <td>{submittedAt[rowIndex]}</td>
        {row.slice(1, row.length ).map((cell, cellIndex) => (
            <td key={cellIndex}>{String(cell).trim() || ' '}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


<div className='piechart'>
  <PieChart width={500} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={200}
      innerRadius={100}
      outerRadius={150}
      fill="#8884d8"
      paddingAngle={1}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart></div>
      <p className='Completed '>Completed {complete} </p>

      <div className='comlition'>
        <p className='comlitionrate'>Completion rate {complete}%</p>
      </div>
</div>



















                   </> ) : (
                        <div className='NoResponse'>
                            <p>No Response yet collected</p>
                        </div>
                    )}
                </>
            ) : (
                <div className='loading-container'>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    )
}

export default FormResponses
