import "./ServerList.css"

export default function ServerList() {
    // Write Code Here
    return (
        <div className="server-list-container">
            <button className="logo-button"></button>
            <div className="divider"></div>
            <div className="servers">
                {/* get servers + map into html */}
            </div>
            <div id="join-create-container">
                <button className="join-button"></button>
                <button className="create-button"></button>
            </div>
        </div>
    )
}