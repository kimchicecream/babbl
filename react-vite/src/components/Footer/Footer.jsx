import "./Footer.css";

function Footer() {
    const redirect = () => {
        window.open("https://github.com/kimchicecream/babbl", "_blank");
    };

    return (
        <>
            <div className="footer-container">
                <div className="title">
                    <h1>Meet the team behind babbl</h1>
                </div>
                <div className="cards-container">
                    <div className="card">
                        <div class="card-info">
                            <div className="card-avatar">
                                <img src='../../../public/Tina.png'/>
                            </div>
                            <div className="card-title">Tina Gao</div>
                            <div className="card-subtitle">Web Developer</div>
                        </div>
                        {/* <ul className="card-social">
                            <li className="card-social__item">
                                <i className="fa-brands fa-linkedin"></i>
                            </li>
                            <li className="card-social__item">
                                <i className="fa-brands fa-square-github"></i>
                            </li>
                        </ul> */}
                    </div>
                    <div className="card">
                        <div className="card-info">
                            <div className="card-avatar">
                                <img src='../../../public/Chris.png'/>
                            </div>
                            <div className="card-title">Chris Peters</div>
                            <div className="card-subtitle">Web Developer</div>
                        </div>
                        {/* <ul className="card-social">
                            <li className="card-social-item">
                                <i className="fa-brands fa-linkedin"></i>
                            </li>
                            <li className="card-social-item">
                                <i className="fa-brands fa-square-github"></i>
                            </li>
                        </ul> */}
                    </div>
                    <div className="card">
                        <div className="card-info">
                            <div className="card-avatar">
                                <img src='../../../public/Alex.png'/>
                            </div>
                            <div className="card-title">Alex Go</div>
                            <div className="card-subtitle">Web Developer</div>
                        </div>
                        {/* <ul className="card-social">
                            <li className="card-social-item">
                                <i className="fa-brands fa-linkedin"></i>
                            </li>
                            <li className="card-social-item">
                                <i className="fa-brands fa-square-github"></i>
                            </li>
                        </ul> */}
                    </div>
                    <div className="card">
                        <div className="card-info">
                            <div className="card-avatar">
                                <img src='../../../public/Bobby.png'/>
                            </div>
                            <div className="card-title">Bobby Stomski</div>
                            <div className="card-subtitle">Web Developer</div>
                        </div>
                        {/* <ul className="card-social">
                            <li className="card-social-item">
                                <i className="fa-brands fa-linkedin"></i>
                            </li>
                            <li className="card-social-item">
                                <i className="fa-brands fa-square-github"></i>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>
            <div className="actual-footer">
                <i class="fa-brands fa-github"></i><button onClick={redirect}>See it on Github</button>
            </div>
        </>
    )
}

export default Footer;
