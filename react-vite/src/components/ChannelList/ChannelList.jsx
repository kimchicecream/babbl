import "./ChannelList.css"

export default function ChannelList() {
    // write code here
    return (
        <div className="channel-list-container">
            <div className="server-header-container">
                <span className="server-name">{/* get current server name */}</span>
                <span className="dropdown"></span>
            </div>
            <div className="channels">
                {/* get channels + map into html */}
            </div>
        </div>
    )
}