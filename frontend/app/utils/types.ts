export interface User {
    id: string;
    username: string;
    email: string;
}

export interface MusicApp {
    color: string;
    icon: string;
    name: string;
    isConnected: boolean;
    isCommingSoon: boolean;
    onConnect?: () => void;
    onDisconnect?: () => void;
}