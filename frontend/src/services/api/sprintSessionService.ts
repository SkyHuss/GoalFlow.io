import { SprintSession } from "../../models/SprintSession";
import api from "./api";

export class SprintSessionService {

    async getSprintSessionList() {
        const response = await api.get<SprintSession[]>('/sprint-session/');
        return response.data;
    }
}