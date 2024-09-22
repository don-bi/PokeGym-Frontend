import './App.css'
import { useAppDispatch } from './app/hooks'
import { setWorkoutDaysStore, setWorkoutSplitsStore } from './services/workouts';

function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setWorkoutSplitsStore(dispatch)}>
          Test
        </button>
        <button onClick={() => setWorkoutDaysStore(dispatch)}>
          Test
        </button>
      </header>
    </div>
  )
}

export default App
