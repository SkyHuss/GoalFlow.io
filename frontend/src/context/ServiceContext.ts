import { createContext } from "react";
import { SprintSessionService } from "../services/api/sprintSessionService";

// Interface pour regrouper tous les services
export interface ServiceContextType {
    sprintSessionService: SprintSessionService;
}

// Export du contexte
export const ServiceContext = createContext<ServiceContextType | null>(null);