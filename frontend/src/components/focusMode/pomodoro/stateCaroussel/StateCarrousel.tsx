import { ChevronRight, Coffee, Work } from '@mui/icons-material';
import { useState } from 'react';
import './StateCarrousel.css';

export default function StateCarrousel() {
    const initialItems = [<Work key="work0" />, <Coffee key="coffee0" />, <Work key="work1" />, <Coffee key="coffee1" />];
    const [items, setItems] = useState(initialItems);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        const nextItem = currentIndex % 2 === 0 ? <Work key={`work${items.length}`} /> : <Coffee key={`coffee${items.length}`} />;
        setItems((prevItems) => [...prevItems, nextItem]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <div className="state-caroussel-container">
            <div className="state" onClick={handleNext}>
                {currentIndex % 2 === 0 ? 
                    <>Time to Work !</> : 
                    <>Take a break...</>
                }
            </div>
            {/* Carrousel */}
            <div className="state-caroussel-content">
                <div
                    className="state-caroussel-scroll"
                    style={{ transform: `translateX(-${currentIndex * 115}px)` }}
                >
                    {items.map((item, index) => (
                        <div className="state-caroussel-item-wrapper" key={index}>
                            <div
                                className={`state-caroussel-item ${index === currentIndex ? 'active' : ''}`}
                            >
                                {item}
                            </div>
                            
                            {/* Separator */}
                            {index < items.length - 1 && <div className="state-caroussel-separator"><ChevronRight /></div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}