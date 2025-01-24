import React, { ReactNode } from "react";
import { ServiceContext, ServiceContextType } from "./ServiceContext";
import { SprintSessionService } from "../services/api/sprintSessionService";

// Interface pour les props du ServiceProvider
interface ServiceProviderProps {
    children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
    const services: ServiceContextType = {
        sprintSessionService: new SprintSessionService(),
    };

    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    );
};
