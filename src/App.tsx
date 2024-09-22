import { useEffect } from 'react'
import './App.css'
import WorkoutList from './components/WorkoutList'
import { setWorkoutDaysStore, setWorkoutExercisesStore, setWorkoutSetsStore, setWorkoutSplitsStore } from './services/workouts'
import { useAppDispatch } from './app/hooks'


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      setWorkoutSplitsStore(dispatch)
      setWorkoutDaysStore(dispatch)
      setWorkoutExercisesStore(dispatch)
      setWorkoutSetsStore(dispatch)
  }, [])

  return (
    <WorkoutList />
  )
}

export default App
