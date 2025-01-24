import type { SprintSession } from "../../../models/SprintSession"
import './SprintSessionCard.css'

interface Props {
    session: SprintSession;
}

export default function SprintSessionCard ({session}: Props) {

    return <div className="sprint-session-container">{session.name}</div>
}