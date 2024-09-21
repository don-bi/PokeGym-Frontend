import './App.css'
import { useAppDispatch } from './app/hooks'
import { addWorkoutDayStore } from './services/workoutDay';
import { addWorkoutExerciseStore } from './services/workoutExercise';
import { setWorkoutSplitsStore } from './services/workoutSplit';

function App() {
  const dispatch = useAppDispatch();
  const WorkoutDay = {
    Id: 1,
    Name: "Test",
    Note: "Test",
    Date: "2021-01-01",
    WorkoutSplitId: 1,
    workoutExercises: []
  }
  const WorkoutExercise = {
    Id: 1,
    Name: "TestExercise",
    WorkoutDayId: 1,
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setWorkoutSplitsStore(dispatch)}>
          Test
        </button>
        <button onClick={() => addWorkoutDayStore(dispatch, WorkoutDay)}>
          Test2
        </button>
        <button onClick={() => addWorkoutExerciseStore(dispatch, WorkoutExercise)}>
          Test2
        </button>
      </header>
    </div>
  )
}

export default App
