import { useEffect } from 'react';
import './LoadingPage.css';


function LoadingPage() {
    // useEffect to keep the page from scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
        document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className='loading-page-container'>
            <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingPage;
