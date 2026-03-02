import { useEffect, useState } from 'react'
import pkg from '../package.json'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import WordCard from './components/WordCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Library } from 'lucide-react'
import './App.css'

interface VocabItem {
  id: string
  japones: string
  coreana: string
  level: string
  conversacion?: string
  expresion_similar?: string[]
}

function App() {
  const [vocab, setVocab] = useState<VocabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vocabulary"));
        const data = querySnapshot.docs.map(doc => doc.data() as VocabItem);
        data.sort((a, b) => a.id.localeCompare(b.id));
        setVocab(data);
      } catch (error) {
        console.error("Error fetching vocabulary: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  const filteredVocab = filter === 'ALL'
    ? vocab
    : vocab.filter(item => item.level === filter);

  const levels = ['ALL', 'IM2', 'IH', 'AL'];

  return (
    <div className="app">
      {/* Side Banner (The Charm of Language) */}
      <div className="sideBanner">
        <span className="bannerText">語学の魅力</span>
        <div className="bannerLine" />
      </div>

      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`bentoTile titleSection`}>
          <div className="versionBadge">v{pkg.version}</div>
          <motion.div 
            className="titleWrapper"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="title">VocaJapones</h1>
            <Sparkles className="titleIcon" size={24} />
          </motion.div>
          <p className="subtitle">Unlocking the Japanese Vibe • Neo-Zen Edition</p>
        </div>

        <div className={`bentoTile statsTile`}>
          <div className="statsHeader">
            <Library className="statsIcon" size={16} />
            <span className="statsLabel">STASH</span>
          </div>
          <div className="statsMain">
            <span className="statsValue">{filteredVocab.length}</span>
            <div className="statsFilters">
              {levels.map(lvl => (
                <button 
                  key={lvl}
                  className={`miniFilterBtn ${filter === lvl ? 'active' : ''}`}
                  onClick={() => setFilter(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>


      <main>
        {loading ? (
          <div className="loading">Loading the stash...</div>
        ) : (
          <motion.div 
            className="cardGrid"
            layout
          >
            <AnimatePresence mode='popLayout'>
              {filteredVocab.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.03,
                    ease: "easeOut"
                  }}
                >
                  <WordCard 
                    japones={item.japones}
                    coreana={item.coreana}
                    level={item.level}
                    conversacion={item.conversacion}
                    expresion_similar={item.expresion_similar}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default App
