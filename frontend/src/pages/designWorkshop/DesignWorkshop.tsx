import { AddCircleOutline, Delete, Notifications, OpenInBrowser, ViewCarousel } from '@mui/icons-material';
import NavButton from '../../components/generic/navButton/NavButton';
import './DesignWorkshop.css';
import ActionButton from '../../components/generic/actionButton/ActionButton';
import { ButtonType } from '../../constants/buttons/buttonsTypes';
import Tab, { TabItem } from '../../components/generic/tab/Tab';
import { useState } from 'react';
import Modal from '../../components/generic/modal/Modal';
import { ModalPosition } from '../../constants/modal/modalPosition';
import TextInput from '../../components/generic/form/textInput/TextInput';
import { DateTime } from 'luxon';
import TextAreaInput from '../../components/generic/form/textArea/TextAreaInput';
import DatePickerInput from '../../components/generic/form/datePicker/DatePickerInput';
import FileInput from '../../components/generic/form/fileInput/FileInput';
import ConfirmDialog from '../../components/generic/confirmDialog/ConfirmDialog';
import PasswordInput from '../../components/generic/form/password/PasswordInput';
import Paginator from '../../components/generic/pagination/Paginator';

export default function DesignWorkshop() {

    const tabsItems: TabItem[] = [
        {id: 0, label: 'In progress', count: 8},
        {id: 1, label: 'Not started', count: 2},
        {id: 2, label: 'Completed', count: 265},
    ];

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedTabId, setSelectedTabId] = useState<number>(0);
    const [isDefaultModalDisplay, setIsDefaultModalDisplay] = useState<boolean>(false);
    const [isTopRightModalDisplay, setIsTopRightModalDisplay] = useState<boolean>(false);
    const [isTopLeftModalDisplay, setIsTopLeftModalDisplay] = useState<boolean>(false);
    const [isBottomRightModalDisplay, setIsBottomRightModalDisplay] = useState<boolean>(false);
    const [isBottomLeftModalDisplay, setIsBottomLeftModalDisplay] = useState<boolean>(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)

    interface FormData {
        name: string,
        description: string,
        password: string,
        picture: File | null,
        dueDate: DateTime,
        startDate: DateTime,
    }

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        password: '',
        picture: null,
        startDate: DateTime.now(),
        dueDate: DateTime.now()
    })

    const handleInputChange = (key: string, value: string | DateTime | File | null) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return <div className="design-workshop-container">
        <div className="header">Here is a list of all generic components</div>
        <div className="components">
            {/* Table */}
            <div className='section'>
                Table
                <div className="items">
                    <Paginator numPages={5} activePage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>
                <div>La page courante: {currentPage}</div>
            </div>
            {/* BUTTONS */}
            <div className='section'>
                Dialog
                <div className="items">
                    <ActionButton label='Supprimer' icon={Delete} type={ButtonType.Danger} onClick={() => setIsConfirmDialogOpen(true)}/>
                    {isConfirmDialogOpen && 
                        <ConfirmDialog 
                            messageTitle='Are you sure !???' 
                            message='You are about to delete an element: element name'
                            onCancel={() => setIsConfirmDialogOpen(false)}
                            onConfirm={() => {console.log('confirmed'); setIsConfirmDialogOpen(false)}}
                        />
                    }
                </div>
            </div>
            {/* Form */}
            <div className="section">
                Form
                <div className="items">
                    <TextInput
                        isRequired={true}
                        value={formData.name}
                        placeholder='Enter a session title...'
                        onChange={(newValue: string) => handleInputChange('name', newValue)}
                        label='Sprint session title'
                        subLabel='The description of the new sprint session'
                    />
                    <PasswordInput
                        isRequired={true}
                        value={formData.password}
                        placeholder='Enter your password...'
                        onChange={(newValue: string) => handleInputChange('password', newValue)}
                        label='Enter your password'
                        subLabel='The description of the type of password'
                    />
                    <TextAreaInput
                            isRequired={false}
                            value={formData.description}
                            placeholder='Enter a description...'
                            onChange={(newValue: string) => handleInputChange('description', newValue)}
                            label='Description'
                            subLabel='The description of the new sprint session'
                    />
                    <DatePickerInput
                        label='Start date'
                        subLabel='The date when the sprint session start'
                        isRequired={true}
                        value={formData.startDate}
                        placeholder='Enter a start date...'
                        onChange={(newValue: DateTime | null) => handleInputChange('startDate', newValue)}
                        disabled={false}
                    />
                    <FileInput 
                        label='Session picture'
                        subLabel='A small picture to quicky identify the sprint session'
                        isRequired={true}
                        file={formData.picture}
                        setFile={(file: File | null) => handleInputChange('picture', file)}
                    
                        placeholder='Select a image...'
                    />
                    <ActionButton label='Log form' icon={ViewCarousel} type={ButtonType.Success} onClick={() => console.log("test: ", formData)}/>
                </div>
            </div>
            {/* BUTTONS */}
            <div className='section'>
                Buttons
                <div className="items">
                    <NavButton icon={Notifications}  notification={45} onClick={() => {console.log("nav button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} label='Primary button' onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} label='Primary outlined button' outlined={true} onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} type={ButtonType.Secondary} label='Secondary button' onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} type={ButtonType.Success} label='Success button' onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} type={ButtonType.Success} outlined={true} label='Outlined success button' onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} type={ButtonType.Danger} label='Danger button' onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} type={ButtonType.Danger} outlined={true} label='Outlined danger button' onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} type={ButtonType.Info} label='Info button' onClick={() => {console.log("action button clicked !")}}/>
                    <ActionButton icon={AddCircleOutline} type={ButtonType.Info} outlined={true} label='Outlined info button' onClick={() => {console.log("action button clicked !")}}/>
                </div>
            </div>
            {/* Tabs */}
            <div className='section'>
                Tabs
                <div className="items">
                    <Tab tabs={tabsItems} selectTabId={selectedTabId} setSelectedTabId={setSelectedTabId}/>
                </div>
            </div>

            {/* Modals */}
            <div className='section'>
                Modals
                <div className="items">
                    <ActionButton icon={OpenInBrowser} label='Open modal' onClick={() => setIsDefaultModalDisplay(true)}/>
                    {isDefaultModalDisplay && (
                        <Modal closeModal={() => setIsDefaultModalDisplay(false)} title='Modal title example' minWidth={500}>
                            Modal content
                        </Modal>
                    )}
                    <ActionButton icon={OpenInBrowser} label='Open top left modal' onClick={() => setIsTopLeftModalDisplay(true)}/>
                    {isTopLeftModalDisplay && (
                        <Modal closeModal={() => setIsTopLeftModalDisplay(false)} position={ModalPosition.TopLeft} title='Modal title example' minWidth={500}>
                            Modal content
                        </Modal>
                    )}
                    <ActionButton icon={OpenInBrowser} label='Open top right modal' onClick={() => setIsTopRightModalDisplay(true)}/>
                    {isTopRightModalDisplay && (
                        <Modal closeModal={() => setIsTopRightModalDisplay(false)} position={ModalPosition.TopRight} title='Modal title example' minWidth={500}>
                            Modal content
                        </Modal>
                    )}

                    <ActionButton icon={OpenInBrowser} label='Open bottom left modal' onClick={() => setIsBottomLeftModalDisplay(true)}/>
                    {isBottomLeftModalDisplay && (
                        <Modal closeModal={() => setIsBottomLeftModalDisplay(false)} position={ModalPosition.BottomLeft} title='Modal title example' minWidth={500}>
                            Modal content
                        </Modal>
                    )}

                    <ActionButton icon={OpenInBrowser} label='Open bottom right modal' onClick={() => setIsBottomRightModalDisplay(true)}/>
                    {isBottomRightModalDisplay && (
                        <Modal closeModal={() => setIsBottomRightModalDisplay(false)} position={ModalPosition.BottomRight} title='Modal title example' minWidth={500}>
                            Modal content
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    </div>
}