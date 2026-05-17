import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookSession from './components/BookSession'
import ContactUs from './components/ContactUs'
import Home from './pages/Home'
import Numerology from './pages/Numerology'
import BioGeometry from './pages/BioGeometry'
import MeditationBreathwork from './pages/MeditationBreathwork'
import ChakraReading from './pages/ChakraReading'
import Retreats from './pages/Retreats'
import About from './pages/About'
import ComingSoon from './pages/ComingSoon'
import Books from './pages/Books'
import Fees from './pages/Fees'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <div className="stars-bg" />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/numerology" element={<Numerology />} />
          <Route path="/biogeometry" element={<BioGeometry />} />
          <Route path="/meditation-breathwork" element={<MeditationBreathwork />} />
          <Route path="/chakra-reading" element={<ChakraReading />} />
          <Route path="/retreats" element={<Retreats />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<ComingSoon />} />
          <Route path="/gallery" element={<ComingSoon title="Gallery" />} />
          <Route path="/fees" element={<Fees />} />
        </Routes>
      </main>
      <Footer />
      <ContactUs />
      <BookSession />
    </>
  )
}
