import { useEffect, useRef, useState } from 'react'
import { createUser, getAllUsers, removeUser } from '../../../services/api/adminService'
import { toast } from 'react-toastify'
import ActionButton from '../../generic/actionButton/ActionButton'
import { Add, Check, Close, Delete, NoPhotography, Tune } from '@mui/icons-material'
import { truncateString } from '../../../utils/strings'
import { ButtonType } from '../../../constants/buttons/buttonsTypes'
import ConfirmDialog from '../../generic/confirmDialog/ConfirmDialog'
import { AppUser } from '../../../hooks/useUserStore'
import './UserTable.css'
import Paginator from '../../generic/pagination/Paginator'
import Modal from '../../generic/modal/Modal'
import SignUpForm from '../../auth/signUp/SignUpForm'
import { SignUpFormData } from '../../../services/api/authService'
import { defaultUserCredentials } from '../../../constants/initialisation/initialisation'
import { UserWithRole } from 'better-auth/plugins'

export default function UserTable() {

    const [users, setUsers] = useState<AppUser[]>([]);
    const [newUserCredentials, setNewUserCredentials] = useState<SignUpFormData>(defaultUserCredentials)
    const [focusedUser, setFocusedUser] = useState<AppUser | null>(null)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
    const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState<boolean>(false); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const ROW_HEIGHT = 90;
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const handleFiltering = () => {
        console.log("Todo: implement filtering")
    }

    const handleUserCreate = async () => {

        const response = await createUser(newUserCredentials);

        if(response.error) {
            toast.error(`Error: `+ response.error.message);
            return;        
        }

        if(response.data) {
            toast.success(`User: ${response.data.user.email} created with success`);
            setUsers((prevUsers) => [...prevUsers, response.data.user]);
            setIsCreateUserFormOpen(false)
        }
    };

    const handleDeleteUser = (user: AppUser) => {
        setFocusedUser(user);
        setIsConfirmDialogOpen(true);
    }

    const handleDeleteCancel = () => {
        setFocusedUser(null);
        setIsConfirmDialogOpen(false);
    }

    const deleteUser = async () => {
        if(focusedUser) {
            try {
                const response = await removeUser(focusedUser.id);
                if(response.data?.success) {
                    toast.success(`User: ${focusedUser.name} successfully deleted`);
                    setUsers((prevUsers) => prevUsers.filter(item => item.id !== focusedUser.id ))
                }

                if(response.error) {
                    toast.error("Error: " + response.error.message);
                }
    
            } catch (error) {
                toast.error("Error: " + error);
            }
        }
        setIsConfirmDialogOpen(false);
    } 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const appUsers: UserWithRole[] | undefined = await getAllUsers(); 
                if (appUsers && appUsers.length > 0) {
                    setUsers(appUsers);
                }
            } catch (error) {
                toast.error("Error during users list retrieval: " + error)
            }
        }
        fetchUsers();
    }, [])

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (tableContainerRef.current) {
                const containerHeight = tableContainerRef.current.clientHeight - 175; //175px for the thead style and header style
                const calculatedItems = Math.floor(containerHeight / ROW_HEIGHT);
                setItemsPerPage(calculatedItems > 0 ? calculatedItems : 1); 
            }
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);

        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const pagesNumber = Math.ceil(users.length / itemsPerPage)

    return <div className="user-table-container" ref={tableContainerRef}>
        <div className="filters-container">
            <div className="label">All users <span>( {users.length} )</span></div>
            <div className="filters">
                {/* TODO: dev searchbar */}
                <ActionButton label='Filters' icon={Tune} onClick={handleFiltering} outlined/>
                <ActionButton label='Add user' icon={Add}  onClick={() => setIsCreateUserFormOpen(true)} type={ButtonType.Success}/>
            </div>
        </div>
        {users.length > 0 ? (
            <table className='user-table-content'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Profile picutre</th>
                            <th>Fullname</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Email verified</th>
                            <th>Creation date</th>
                            <th>Last update date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers
                            .map(user => (
                            <tr key={user.id}>
                                <td>{truncateString(user.id, 20, '...')}</td>
                                <td>
                                    <div className="image-container">
                                        {user.image ? 
                                            <img src={user.image} alt={user.name} className='user-avatar'/> : 
                                            <div className="no-image">
                                                <NoPhotography />
                                            </div>    
                                        }   
                                    </div>

                                </td>
                                <td>{user.name}</td>
                                <td>{user.role ? user.role : null}</td>
                                <td>{user.email}</td>
                                <td>{user.emailVerified ? <Check className='text-success-400' /> : <Close className='text-danger-400'/>}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="actions-container">
                                        <ActionButton icon={Delete}  onClick={() => handleDeleteUser(user)} label='Delete' type={ButtonType.Danger}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        ) : (
            <p>No user found</p>
        )}
        {pagesNumber > 1 && 
            <Paginator activePage={currentPage} numPages={pagesNumber} setCurrentPage={setCurrentPage}/>
        }

        {/* Modals */}
        {isConfirmDialogOpen && 
            <ConfirmDialog 
                messageTitle='Are you sure ?'
                message={`You are about to delete the user named: ${focusedUser?.name}`}
                onCancel={handleDeleteCancel}
                onConfirm={() => deleteUser()}
            />
        }

        {isCreateUserFormOpen && 
            <Modal title='Add a user' closeModal={() => setIsCreateUserFormOpen(false)}>
                <SignUpForm 
                    handleSignUp={handleUserCreate} 
                    credentials={newUserCredentials} 
                    setCredentials={setNewUserCredentials}
                    displayImage={false}
                />
            </Modal>
        }


    </div>
}