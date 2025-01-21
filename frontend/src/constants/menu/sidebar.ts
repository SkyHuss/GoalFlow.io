import { CrisisAlert, DirectionsRun, History, PieChart } from "@mui/icons-material";
import { SidebarItemType } from "../../components/sidebar/sidebarItem/SidebarItem";

export const sidebarItems: SidebarItemType[] = [
    { label: 'Sprints sessions', icon: DirectionsRun, path: '/session-list' },
    { label: 'Focus mode', icon: CrisisAlert, path: '/focus'},
    { label: 'Analytics', icon: PieChart, path: '/analytics'},
    { label: 'History', icon: History, path: '/history'}
];