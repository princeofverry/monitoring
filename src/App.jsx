import './App.css'
import Circular from './components/circular'

function App() {
  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_-50%,#c7d2fe_40%,transparent_100%)] dark:[background:radial-gradient(125%_125%_at_50%_-50%,#6366f136_40%,transparent_100%)]"></div>
        <div className="relative flex flex-row items-center justify-evenly py-4">
          <div className='flex flex-col items-center font-semibold'>
            <img src="/undip.png" alt="logo-undip" className='md:w-20 md:h-20 w-16' />
            {/* <p className='md:text-base text-xs'>Universitas Diponegoro</p> */}
          </div>
          <h1 className='text-center md:text-3xl text-xl font-bold text-blue-500'>Monitoring</h1>
          <div className='flex flex-col items-center font-semibold'>
            <img src="/aterkia.png" alt="logo-ater" className='md:w-28 md:h-28 w-16' />
            {/* <p className='md:text-base text-xs'>Aterkia</p> */}
          </div>
        </div>
        <div className="relative z-10">
          <Circular />
        </div>

      </div>
    </>
  )
}

export default App
