import { useState, useEffect } from 'react'

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = () => {
    if (input.trim() === '') return
    setHabits([...habits, { name: input, done: false }])
    setInput('')
  }

  const toggleHabit = (index) => {
    const newHabits = [...habits]
    newHabits[index].done = !newHabits[index].done
    setHabits(newHabits)
  }

  const deleteHabit = (index) => {
    const newHabits = habits.filter((_, i) => i !== index)
    setHabits(newHabits)
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '1rem' }}>
      <h1>📝 My Habit Tracker</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new habit"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={addHabit}>Add Habit</button>
      <ul>
        {habits.map((habit, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.5rem',
            }}
          >
            <span
              onClick={() => toggleHabit(index)}
              style={{
                textDecoration: habit.done ? 'line-through' : 'none',
                cursor: 'pointer',
                flexGrow: 1,
              }}
            >
              {habit.name}
            </span>
            <button
              onClick={() => deleteHabit(index)}
              style={{
                marginLeft: '0.5rem',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
              }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
