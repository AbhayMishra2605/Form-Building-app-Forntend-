import './centerPageContainer.css'
import { pageImage } from '../data'

function CenterPageContainer() {
    return (
        <div className='centerPageContainer'>
             <div className='centerPageContainerLeftImage'>
               </div>
             <div className='centerPageContainerRighttImage'>
             </div>
               <div className='centerPageContainerCenterImage'>
                   <img src={pageImage} alt='PageImage'/>
                </div>
            
        </div>
    )
}

export default CenterPageContainer
