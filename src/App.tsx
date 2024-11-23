import { Footer } from "./components/Footer"
import { Container } from "./components/Login/Container"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center h-full items-center pt-20">
        <Container />
      </div>
      <Footer />
    </>
  )
}

export default App
