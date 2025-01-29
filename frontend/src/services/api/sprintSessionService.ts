import { SprintSessionFormData } from "../../components/sprintSession/form/SprintSessionForm";
import { SprintSession } from "../../models/SprintSession";
import api from "./api";

export const getSprintSessionList = async (): Promise<SprintSession[]> => {
    const response = await api.get<SprintSession[]>('/sprint-session/');
    return response.data;
}

export const postSprintSession = async (data: SprintSessionFormData): Promise<SprintSession> => {

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);

    if(data.picture) {
        formData.append('picture', data.picture) 
    }
    if (data.startDate && data.startDate.toISO()) {
        formData.append('startDate', data.startDate.toISO() as string);
    }
    
    if (data.dueDate && data.dueDate.toISO()) {
        formData.append('dueDate', data.dueDate.toISO() as string);
    }
    console.log("mama: ", data)
    const response = await api.post<SprintSession>('/sprint-session', formData);
    return response.data;
}
