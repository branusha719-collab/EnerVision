import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import Analytics from './pages/Analytics';
import About from './pages/About';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' } },
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white dark:bg-[#080d18] transition-colors duration-300 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/forecast" element={<PageWrapper><Forecast /></PageWrapper>} />
            <Route path="/analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="*" element={
              <PageWrapper>
                <div className="min-h-[70vh] flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <p className="mono text-8xl font-bold text-slate-100 dark:text-slate-900">404</p>
                    <p className="text-slate-400 text-lg">Page not found</p>
                  </div>
                </div>
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}
