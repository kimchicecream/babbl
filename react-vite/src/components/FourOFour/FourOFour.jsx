import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FourOFour.css';

function FourOFour() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
          document.body.style.overflow = "auto";
        };
    }, []);

    const handleGoBack = () => {
        navigate('/babbl');
    };

    return (
        <>
            <div className='page-container'>
                <div className='text'>
                    <h1 id='text'>Oh no! You’ve hit a <h1 id='four'>404.</h1> Don’t worry, even the best explorers get lost sometimes.</h1>
                </div>
                <div className='button'>
                    <button className='home-button' onClick={handleGoBack}>Go back home</button>
                </div>
            </div>
        </>
    )
}

export default FourOFour;
