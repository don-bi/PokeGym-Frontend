import { useEffect } from 'react'
import './App.css'
import WorkoutList from './components/Workout/WorkoutList'
import { setWorkoutDaysStore, setWorkoutExercisesStore, setWorkoutSetsStore, setWorkoutSplitsStore } from './services/workouts'
import { useAppDispatch } from './app/hooks'
import SignInForm from './components/Auth/SigninForm'


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      setWorkoutSplitsStore(dispatch)
      setWorkoutDaysStore(dispatch)
      setWorkoutExercisesStore(dispatch)
      setWorkoutSetsStore(dispatch)
  }, [])

  return (
    <>
      {/* <WorkoutList /> */}
      <SignInForm />
    </>
  )
}

export default App
