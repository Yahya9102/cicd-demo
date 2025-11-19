import { useState } from 'react'
import SignupForm from './components/SignupForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div>
      <h1>DevOps Demo</h1>
      <h2> Ni ska sätta upp CI/CD för.
        Pipen ska köra tester och bygga projektet innan deploy.</h2>
      <SignupForm />
    </div>
    </>
  )
}

export default App
