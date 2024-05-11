import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch'
import UserWorkouts from './UserWorkouts'
import { WORKOUTS } from '../../utils/constants'
import AvalableWorkout from './AvalableWorkout'
import { useCallback, useState } from 'react'
import ModalProvider from '../ModalProvider'
import AddWorkoutModal from './AddWorkoutModal'
import { fetch } from '../../utils/fetch'
import ModifyWorkoutModal from './ModifyWorkoutModal'
import WorkoutShimerUI from '../shimerUI/WorkoutShimerUI'

const Workouts = () => {
    const [addWorkoutModalState, setAddWorkoutModalState] = useState<{
        visible: boolean
        workout: string
    }>({
        visible: false,
        workout: '',
    })
    const [modifyWorkoutModalState, setModifyWorkoutModalState] = useState<{
        visible: boolean
        workoutName: string
    }>({
        visible: false,
        workoutName: '',
    })

    // * fetching all the workout added previous
    const {
        isLoadding,
        error,
        data: workouts,
    } = useFetch('/api/workout/getworkout', {}, {}, 'GET')

    const viewAddWorkoutModalHandler = useCallback((workout: string) => {
        setAddWorkoutModalState({
            visible: true,
            workout,
        })
    }, [])

    const viewModifWorkoutModalHandler = useCallback((workoutName: string) => {
        setModifyWorkoutModalState({
            visible: true,
            workoutName,
        })
    }, [])

    const addWorkoutHandler = useCallback(
        async ({
            totalWorkoutTime,
            workoutName,
            totalCaloriesBurned,
        }: {
            [key: string]: string
        }) => {
            // * edge cases for empty values
            if (
                [totalWorkoutTime, workoutName, totalCaloriesBurned].some(
                    (val) => {
                        if (!val.trim()) {
                            return true
                        }
                    },
                )
            ) {
                return toast.error('empty input fields', {
                    position: 'bottom-right',
                })
            }
            // * edge cases for already added workouts
            const isWorkoutInMyList = workouts?.includes(workoutName)
            if (isWorkoutInMyList) {
                toast.error(`${workoutName} is already in your list`, {
                    position: 'bottom-right',
                })
            }

            // * request to add a workout to server
            const response = await fetch('/api/workout/add', 'POST', {
                totalCaloriesBurned,
                workoutName,
                totalWorkoutTime,
            })

            if (response) {
                if (response.sucess)
                    toast.success(response.message, {
                        position: 'bottom-right',
                    })
                else
                    toast.error(response.message, {
                        position: 'bottom-right',
                    })
            }
            setAddWorkoutModalState({
                visible: false,
                workout: '',
            })
        },
        [addWorkoutModalState],
    )

    const modifyWorkoutHandler = useCallback(
        async (
            totalWorkoutTime: number,
            workoutName: string,
            totalCaloriesBurned: number,
        ) => {
            const response = await fetch('/api/workout/update', 'PATCH', {
                totalWorkoutTime,
                workoutName,
                totalCaloriesBurned,
            })

            if (response) {
                if (response.sucess)
                    toast.success(response.message, {
                        position: 'bottom-right',
                    })
                else toast.error(response.message, { position: 'bottom-right' })
            }
            setModifyWorkoutModalState({
                visible: false,
                workoutName: '',
            })
        },
        [modifyWorkoutModalState],
    )

    if (error) toast.error(error)

    if (isLoadding) return <WorkoutShimerUI />

    return (
        <div className='mx-5 md:mx-10 lg:mx-32 xl:mx-56 my-10 min-h-[80vh]'>
            <h1 className='text-center text-sm sm:text-lg font-semibold'>
                Your Todays Workouts
            </h1>
            <hr />
            <div className='mb-10 md:mb-20 w-full overflow-x-auto grid grid-flow-col gap-8 py-5 place-content-start'>
                {workouts && workouts.length ? (
                    workouts.map((workout: any) => {
                        return (
                            <UserWorkouts
                                key={workout.id}
                                workout={workout}
                                clickHandler={viewModifWorkoutModalHandler}
                            />
                        )
                    })
                ) : (
                    <p className='text-lg md:text-2xl text-center'>
                        no workout found
                    </p>
                )}
            </div>
            <h1 className='text-center text-sm sm:text-lg font-semibold'>
                Add Workouts
            </h1>
            <hr />
            <div className='my-10 py-5 mb-20 flex gap-8 items-center justify-start w-full overflow-x-auto'>
                {WORKOUTS.map((workout) => {
                    return (
                        <AvalableWorkout
                            key={workout}
                            workout={workout}
                            clickHandler={viewAddWorkoutModalHandler}
                        />
                    )
                })}
            </div>
            {addWorkoutModalState.visible && (
                <ModalProvider>
                    <div className='fixed w-[100vw] top-0 left-0 bg-theme-bg-dark bg-opacity-45 backdrop-blur-md'>
                        <AddWorkoutModal
                            workout={addWorkoutModalState.workout}
                            addHandler={addWorkoutHandler}
                            closeModal={() => {
                                setAddWorkoutModalState({
                                    visible: false,
                                    workout: '',
                                })
                            }}
                        />
                    </div>
                </ModalProvider>
            )}
            {modifyWorkoutModalState.visible && (
                <ModalProvider>
                    <div className='fixed w-[100vw] top-0 left-0 bg-theme-bg-dark bg-opacity-45 backdrop-blur-md'>
                        <ModifyWorkoutModal
                            workoutName={modifyWorkoutModalState.workoutName}
                            modifyHandler={modifyWorkoutHandler}
                            closeModal={() => {
                                setModifyWorkoutModalState({
                                    visible: false,
                                    workoutName: '',
                                })
                            }}
                        />
                    </div>
                </ModalProvider>
            )}
        </div>
    )
}

export default Workouts
