import { AddCircleOutline, Notifications, OpenInBrowser } from '@mui/icons-material';
import NavButton from '../../components/generic/navButton/NavButton';
import './DesignWorkshop.css';
import ActionButton from '../../components/generic/actionButton/ActionButton';
import { ButtonType } from '../../constants/buttons/buttonsTypes';
import Tab, { TabItem } from '../../components/generic/tab/Tab';
import { useState } from 'react';
import Modal from '../../components/generic/modal/Modal';
import { ModalPosition } from '../../constants/modal/modalPosition';

export default function DesignWorkshop() {

    const tabsItems: TabItem[] = [
        {id: 0, label: 'In progress', count: 8},
        {id: 1, label: 'Not started', count: 2},
        {id: 2, label: 'Completed', count: 265},
    ];

    const [selectedTabId, setSelectedTabId] = useState<number>(0);
    const [isDefaultModalDisplay, setIsDefaultModalDisplay] = useState<boolean>(false);
    const [isTopRightModalDisplay, setIsTopRightModalDisplay] = useState<boolean>(false);
    const [isTopLeftModalDisplay, setIsTopLeftModalDisplay] = useState<boolean>(false);
    const [isBottomRightModalDisplay, setIsBottomRightModalDisplay] = useState<boolean>(false);
    const [isBottomLeftModalDisplay, setIsBottomLeftModalDisplay] = useState<boolean>(false);



    return <div className="design-workshop-container">
        <div className="header">Here is a list of all generic components</div>
        <div className="components">
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