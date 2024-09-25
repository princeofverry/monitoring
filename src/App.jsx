import './App.css'
import Circular from './components/circular'
import Footer from './components/footer'
import Navbar from './components/navbar'

function App() {
  return (
    <>
      <div className="relative w-screen overflow-hidden">
        <div className="absolute inset-0 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_-50%,#c7d2fe_40%,transparent_100%)] dark:[background:radial-gradient(125%_125%_at_50%_-50%,#6366f136_40%,transparent_100%)]"></div>
        <Navbar />
        <div className="relative z-10">
          <Circular />
        </div>
      </div>
    </>
  )
}

export default App
