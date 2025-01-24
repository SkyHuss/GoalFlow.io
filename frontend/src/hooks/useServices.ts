import { useContext } from "react"
import { ServiceContext } from "../context/ServiceContext";


export const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServices must be used within a ServiceProvider');
    }
    return context;
};
