import FocusCard from '../../components/focusMode/focusCard/FocusCard'
import { focusMenu } from '../../constants/focusMode/focusMenu'
import './FocusMode.css'

export default function FocusMode() {
    return <div className="focus-mode-container">
        {focusMenu.map(card => (
            <FocusCard card={card} key={card.title}/>
        ))}
    </div>
}