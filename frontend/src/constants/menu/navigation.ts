import { AdminPanelSettings, CrisisAlert, DirectionsRun, History, NotificationsOutlined, PieChart } from "@mui/icons-material";
import { NavigationItem } from "../../components/sidebar/sidebarItem/SidebarItem";

//TODO: gerer correctement les permissions avec une arborescence de roles
export const sidebarItems: NavigationItem[] = [
    { label: 'Admin panel',icon: AdminPanelSettings, path: '/admin', role: 'admin'},
    { label: 'Sprints sessions', icon: DirectionsRun, path: '/session-list', role: 'user'},
    { label: 'Focus mode', icon: CrisisAlert, path: '/focus', role: 'user'},
    { label: 'Analytics', icon: PieChart, path: '/analytics', role: 'user'},
    { label: 'History', icon: History, path: '/history', role: 'user'}
];

export const bottomNavItems: NavigationItem[] = [
    { icon: PieChart, path: '/analytics', role: 'user'},
    { icon: CrisisAlert, path: '/focus', role: 'user'},
    { icon: DirectionsRun, path: '/session-list', role: 'user'},
    { icon: History, path: '/history', role: 'user'},
    { icon:NotificationsOutlined , path: '/', role: 'user'}
];