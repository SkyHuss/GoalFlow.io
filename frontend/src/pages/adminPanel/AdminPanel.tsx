import UserTable from '../../components/admin/userTable/UserTable'
import './AdminPanel.css'

export default function AdminPanel() {
    return <div className="admin-panel-container">
        <div className="header">
            <div className="title">Users</div>
            <div className="sub-title">Here is a list of all users</div>
        </div>
        <div className="content">
            <UserTable />
        </div>
    </div>
}