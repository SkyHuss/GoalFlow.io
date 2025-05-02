
export enum Effect {
    Bounce = "Bounce",
    Shake = "Shake",
}

export interface FocusCardProps {
        image: string;
        title: string;
        hint: string;
        effect: Effect;
}

export const focusMenu: FocusCardProps[] = [
    {
        image: '/assets/focus/Tomato.png',
        title: 'Pomodoro',
        hint: 'Le Pomodoro est une méthode de gestion du temps basée sur des sessions de 25 minutes de travail, suivies de pauses courtes, pour améliorer la concentration et réduire la procrastination.',
        effect: Effect.Bounce,
    },
    {
        image: '/assets/focus/timer.png',
        title: 'Timer',
        hint: 'Definit un timer pour ta session de travail. Tu peux choisir la durée de la session et le temps de pause.',
        effect: Effect.Shake,
    },
];