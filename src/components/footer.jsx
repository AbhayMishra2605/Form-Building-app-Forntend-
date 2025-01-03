import { pageIcon } from '../data';
import './module.footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
              
                <div className="footer-column logo-column">
                    <div className="logo">
                        <img src={pageIcon} alt="Logo" className="logo-image" />
                        <span>FormBot</span>
                    </div>
                    <p className="footer-credits">
                        Made with ❤️ by <br/><a href='' >@cuvette</a>
                    </p>
                </div>

              
                <div className="footer-column">
                    <h3>Product</h3>
                    <ul>
                        <li><a href="" >Status</a></li>
                        <li><a href="">Documentation</a></li>
                        <li><a href=""  >Roadmap</a></li>
                        <li><a href=""  >Pricing</a></li>
                    </ul>
                </div>

                
                <div className="footer-column">
                    <h3>Community</h3>
                    <ul>
                        <li><a href="" >Discord</a></li>
                        <li><a href="" >GitHub repository</a></li>
                        <li><a href="" >Twitter</a></li>
                        <li><a href="" >LinkedIn</a></li>
                        <li><a href="" >OSS Friends</a></li>
                    </ul>
                </div>

               
                <div className="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="" >About</a></li>
                        <li><a href="" >Contact</a></li>
                        <li><a href="">Terms of Service</a></li>
                        <li><a href="" >Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
