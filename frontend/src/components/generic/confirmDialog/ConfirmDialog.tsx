import ActionButton from "../actionButton/ActionButton";
import Modal from "../modal/Modal";

interface Props {
    message?: string;
    messageTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({ message, messageTitle = "Are you sure ?", onConfirm, onCancel}: Props) {
    return <Modal noCloseButton={true} title={messageTitle}>
        {message && <div className="py-2">{message}</div>}
        <div className="flex gap-3 justify-end end w-full py-2">
            <ActionButton outlined={true} label="Cancel" onClick={onCancel}/>
            <ActionButton label="Confirm" onClick={onConfirm}/> 
        </div>
    </Modal>

}