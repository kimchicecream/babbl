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

    return (
        <>
            <div className='page-container'>
                <div className='title'>
                    <h1>Oh no! You’ve hit a 404. Don’t worry, even the best explorers get lost sometimes.</h1>
                    {/* <h1>404</h1> */}
                </div>
                <div className='button'>
                    <button className='home-button'>Go back</button>
                </div>
            </div>
        </>
    )
}

export default FourOFour;
