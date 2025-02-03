import { SprintSessionFormData } from "../../components/sprintSession/form/SprintSessionForm";
import { SprintSession } from "../../models/SprintSession";
import api from "./api";

// Récupérer la liste des sessions de sprint
export const getSprintSessionList = async (): Promise<SprintSession[]> => {
    const response = await api.get<SprintSession[]>('/sprint-session/');
    return response.data;
};

// Créer une nouvelle session de sprint
export const postSprintSession = async (data: SprintSessionFormData): Promise<SprintSession> => {
    const formData = generateFormData(data);
    const response = await api.post<SprintSession>('/sprint-session', formData);
    return response.data;
};

// Mettre à jour une session de sprint
export const putSprintSession = async (data: SprintSessionFormData): Promise<SprintSession> => {
    if (!data.id) {
        throw new Error("L'ID est requis pour mettre à jour une session.");
    }
    const formData = generateFormData(data);
    const response = await api.put<SprintSession>(`/sprint-session`, formData);
    return response.data;
};

// Supprimer une session de sprint
export const deleteSprintSession = async (sessionId: number): Promise<void> => {
    await api.delete<void>(`/sprint-session/${sessionId}`);
};

// Générer un FormData pour l'envoi des données
const generateFormData = (data: SprintSessionFormData): FormData => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);

    if (data.id) {
        formData.append('id', String(data.id));
    }
    
    if (data.image instanceof File) {
        formData.append('image', data.image);
    } else if (data.image === null) {
        formData.append('image', 'null')
    }

    if (data.startDate) {
        formData.append('startDate', data.startDate);
    }

    if (data.dueDate) {
        formData.append('dueDate', data.dueDate);
    }

    return formData;
};
