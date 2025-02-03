import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalPosition } from '../../../constants/modal/modalPosition';
import './Modal.css';
import { Close } from '@mui/icons-material';

interface Props {
    noCloseButton?: boolean;
    closeModal?: () => void;
    position?: ModalPosition;
    title? : string
    minWidth?: number
}

export default function Modal(props: PropsWithChildren<Props>) {
    const [showContent, setShowContent] = useState(false);
    const [, setDomReady] = useState(false);

    const appContentDiv = document.getElementById('app-container');

    //On open
    useEffect(() => {
        setShowContent(true);
    }, []);

    useEffect(() => {
        setDomReady(true);
    }, []);

    return createPortal(
        <div className={`modal-background ${props.position ? props.position : 'center'}`}>
            <div id="modal" className={`modal-container ${showContent ? 'show-modal' : ''}`}>
                <div className="header">
                    <div className="modal-title">{props.title}</div>
                    {!props.noCloseButton && <div className="close-modal" onClick={props.closeModal}><Close/></div>}
                </div>
                <div className="modal-content" style={{minWidth: props.minWidth ?? 20}}>
                    {props.children}
                </div>
            </div>
        </div>,
        appContentDiv!
    );
}
