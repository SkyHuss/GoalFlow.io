import { CrisisAlert, DirectionsRun, History, NotificationsOutlined, PieChart } from "@mui/icons-material";
import { NavigationItem } from "../../components/sidebar/sidebarItem/SidebarItem";

export const sidebarItems: NavigationItem[] = [
    { label: 'Sprints sessions', icon: DirectionsRun, path: '/session-list' },
    { label: 'Focus mode', icon: CrisisAlert, path: '/focus'},
    { label: 'Analytics', icon: PieChart, path: '/analytics'},
    { label: 'History', icon: History, path: '/history'}
];

export const bottomNavItems: NavigationItem[] = [
    { icon: PieChart, path: '/analytics'},
    { icon: CrisisAlert, path: '/focus'},
    { icon: DirectionsRun, path: '/session-list' },
    { icon: History, path: '/history'},
    { icon:NotificationsOutlined , path: '/'}
];