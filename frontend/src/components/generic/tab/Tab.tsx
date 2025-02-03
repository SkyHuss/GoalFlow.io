import './Tab.css'

export interface TabItem {
    id: number;
    label: string;
    count: number;

}

interface Props {
    tabs: TabItem[]
    selectTabId: number;
    setSelectedTabId: (id: number) => void;  
}

export default function Tab({tabs, selectTabId, setSelectedTabId}: Props) {
    return <div className="tab-container">
        {tabs.map(item => (
            <div className={`tab-item ${item.id === selectTabId ? 'active' : ''}`} key={'tab'+item.id} onClick={() => setSelectedTabId(item.id)}>
                <div className="label">{item.label}</div>
                <div className="count">{item.count}</div>
            </div>
        ))}
    </div>
}