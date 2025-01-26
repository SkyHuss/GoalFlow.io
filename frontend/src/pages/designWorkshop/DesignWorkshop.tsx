import { AddCircleOutline, Notifications } from '@mui/icons-material';
import NavButton from '../../components/generic/navButton/NavButton';
import './DesignWorkshop.css';
import ActionButton from '../../components/generic/actionButton/ActionButton';
import { ButtonType } from '../../constants/buttons/buttonsTypes';
import Tab, { TabItem } from '../../components/generic/tab/Tab';
import { useState } from 'react';

export default function DesignWorkshop() {

    const tabsItems: TabItem[] = [
        {id: 0, label: 'In progress', count: 8},
        {id: 1, label: 'Not started', count: 2},
        {id: 2, label: 'Completed', count: 265},
    ];

    const [selectedTabId, setSelectedTabId] = useState<number>(0);

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

        </div>

    </div>
}