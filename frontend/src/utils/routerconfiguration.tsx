import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import App from '../components/App'
import Workouts from '../components/Workouts/Workouts'
import ErrorPage from '../components/ErrorPage'
import Profile from '../components/Profile/Profile'
import DashBordShimerUI from '../components/shimerUI/DashBordShimerUI'
import StatisticsShimerUI from '../components/shimerUI/StatisticsShimerUI'
import AuthPage from '../pages/AuthPage'
import GoalShimerUI from '../components/shimerUI/GoalShimerUI'
import WorkoutShimerUI from '../components/shimerUI/WorkoutShimerUI'
import ProfileShimerUI from '../components/shimerUI/ProfileShimerUI'
const DashBord = lazy(() => import('../components/DashBord/DashBord'))
const SingleStatistics = lazy(
    () => import('../components/Statistics/SingleStatistics'),
)
const Goals = lazy(() => import('../components/Goals/Goals'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        caseSensitive: true,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<DashBordShimerUI />}>
                        <DashBord />
                    </Suspense>
                ),
            },
            {
                path: '/auth',
                element: <AuthPage />,
            },
            {
                path: '/goals',
                element: (
                    <Suspense fallback={<GoalShimerUI />}>
                        <Goals />
                    </Suspense>
                ),
            },
            {
                path: '/workouts',
                element: (
                    <Suspense fallback={<WorkoutShimerUI />}>
                        <Workouts />
                    </Suspense>
                ),
            },
            {
                path: '/statistics/:type',
                element: (
                    <Suspense fallback={<StatisticsShimerUI />}>
                        <SingleStatistics />
                    </Suspense>
                ),
            },
            {
                path: '/profile',
                element: (
                    <Suspense fallback={<ProfileShimerUI />}>
                        <Profile />
                    </Suspense>
                ),
            },

            { path: '/test', element: <ProfileShimerUI /> },
        ],
    },
])
