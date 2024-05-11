import { ToastOptions } from 'react-hot-toast'

export const LOGO_TEXT = 'FITTRACK'

export const TOAST_OPT: ToastOptions = {
    position: 'bottom-right',
    duration: 5000,
}

export const GOALS = [
    {
        title: 'water',
        describtion: 'Essential for life, source of beauty, resilience',
        color: 'theme-color-aqua',
    },
    {
        title: 'steps',
        describtion:
            'Measure of physical activity, progress toward fitness and health goals',
        color: 'theme-color-orange',
    },
    {
        title: 'sleep',
        describtion:
            'Restorative, essential, rejuvenating, vital for physical and mental well-being',
        color: 'theme-color-purple',
    },
]

export const WORKOUTS = ['walking', 'cycling', 'swimming', 'running']
export const USER_INFO = ['age', 'weight', 'height', 'heart']
