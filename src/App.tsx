import { useEffect } from 'react'
import './App.css'
import WorkoutList from './components/WorkoutList'
import { setWorkoutDaysStore, setWorkoutSplitsStore } from './services/workouts'
import { useAppDispatch } from './app/hooks'


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
      setWorkoutSplitsStore(dispatch)
      setWorkoutDaysStore(dispatch)
  }, [])

  return (
    <WorkoutList />
  )
}

export default App
