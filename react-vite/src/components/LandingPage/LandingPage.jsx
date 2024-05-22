import Footer from '../Footer';
import './LandingPage.css';

function LandingPage() {

    return (
        <div className='landing-page-container'>
            <div className='hero-container'>
                <img src='../../public/landing-background' />
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage;
