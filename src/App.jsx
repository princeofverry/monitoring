import './App.css'
import Circular from './components/circular'

function App() {

  return (
    <>
      <div className='flex flex-row items-center justify-center gap-8'>
        <img src="src/assets/undip.png" alt="logo-undip" className='w-20 h-20'/>
        <h1 className='text-center text-3xl font-bold'>Robo Boat Monitoring System</h1>
        <img src="src/assets/aterkia.jpg" alt="logo-ater" className='w-32 h-32'/>
      </div>
        <Circular/>
    </>
  )
}

export default App
