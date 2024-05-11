import { useCallback, useState } from 'react'
import GoalOption from './GoalOption'
import UserGoals from './UserGoals'
import useFetch from '../../hooks/useFetch'
import GoalShimerUI from '../shimerUI/GoalShimerUI'
import { GOALS } from '../../utils/constants'
import ModalProvider from '../ModalProvider'
import ModifyGoalModal from './ModifyGoalModal'
import { fetch } from '../../utils/fetch'
import toast from 'react-hot-toast'
import SetGoalModal from './SetGoalModal'

const Goals = () => {
    const [modifyGoalModal, setModifyGoalModal] = useState<{
        visible: boolean
        goal: any
    }>({
        visible: false,
        goal: null,
    })
    const [addGoalModal, setAddGoalModal] = useState<{
        visible: boolean
        title: string
    }>({
        visible: false,
        title: '',
    })

    const handleSetGoalModalVIsibility = useCallback(
        (title: string) => {
            setAddGoalModal({
                visible: true,
                title: title,
            })
        },
        [addGoalModal],
    )

    const handleModalVisibility = useCallback(
        (goal: any) => {
            setModifyGoalModal(() => {
                return {
                    visible: true,
                    goal,
                }
            })
        },
        [modifyGoalModal],
    )

    const addGoalHandler = useCallback(
        async (name: string, target: string, unit: string) => {
            const response = await fetch('/api/goal/setgoal', 'POST', {
                name,
                target,
                unit,
            })

            if (response) {
                if (response?.sucess) {
                    toast.success(response.message, {
                        position: 'bottom-right',
                    })
                } else {
                    toast.error(response.message, {
                        position: 'bottom-right',
                    })
                }
            }
            setAddGoalModal(() => {
                return {
                    title: '',
                    visible: false,
                }
            })
        },
        [addGoalModal],
    )

    const updateHandler = useCallback(
        async (goal: any, completedValue: any) => {
            const response = await fetch('/api/goal/updategoal', 'PATCH', {
                type: goal.name,
                completed: completedValue,
            })

            if (response) {
                if (response?.sucess) {
                    toast.success(response.message, {
                        position: 'bottom-right',
                    })
                } else {
                    toast.error(response.message, {
                        position: 'bottom-right',
                    })
                }
            }
            setModifyGoalModal(() => {
                return {
                    visible: false,
                    goal: null,
                }
            })
        },
        [modifyGoalModal],
    )

    let {
        isLoadding,
        error: _,
        data: goals,
    }: any = useFetch('/api/goal/getusergoal', {}, {}, 'GET')

    if (isLoadding) {
        return <GoalShimerUI />
    }

    return (
        <div className='mx-5 md:mx-24 xl:mx-56 my-10 min-h-[80vh]'>
            <div className='w-full overflow-x-auto grid grid-flow-col justify-start gap-4 md:gap-8 py-5'>
                {goals && goals.length ? (
                    goals.map((goal: any) => {
                        return (
                            <UserGoals
                                key={goal.id}
                                goal={goal}
                                clickHandler={handleModalVisibility}
                            />
                        )
                    })
                ) : (
                    <div className='w-44 md:w-48 h-56 bg-gray-600 text-theme-bg-dark grid place-items-center p-2 rounded-md'>
                        <p className='text-xl font-bold text-theme-modal-bg-light text-center opacity-75'>
                            no goals are set
                        </p>
                    </div>
                )}
            </div>
            <div className='goal *:w-full *:mt-5'>
                {GOALS.map((goal) => {
                    const { title, color, describtion } = goal
                    return (
                        <GoalOption
                            color={color}
                            describtion={describtion}
                            handleSetGoal={handleSetGoalModalVIsibility}
                            title={title}
                            key={title}
                        />
                    )
                })}
            </div>
            {modifyGoalModal.visible && (
                <ModalProvider>
                    <div className='fixed w-[100vw] top-0 left-0 bg-theme-bg-dark bg-opacity-45 backdrop-blur-md'>
                        <ModifyGoalModal
                            goal={modifyGoalModal.goal}
                            updateHandler={updateHandler}
                            closeModal={() => {
                                setModifyGoalModal(() => {
                                    return {
                                        visible: false,
                                        goal: null,
                                    }
                                })
                            }}
                        />
                    </div>
                </ModalProvider>
            )}
            {addGoalModal.visible && (
                <ModalProvider>
                    <div className='fixed w-[100vw] top-0 left-0 bg-theme-bg-dark bg-opacity-45 backdrop-blur-md inset-0'>
                        <SetGoalModal
                            name={addGoalModal.title}
                            addGoalHandler={addGoalHandler}
                            closeModal={() => {
                                setAddGoalModal({
                                    visible: false,
                                    title: '',
                                })
                            }}
                        />
                    </div>
                </ModalProvider>
            )}
        </div>
    )
}

export default Goals
