import { useEffect, useState } from 'react'
import pkg from '../package.json'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import WordCard from './components/WordCard'
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
        // Sort by ID to keep order
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
      <header className="header">
        <div className={`bentoTile ${'titleSection'}`}>
          <div className="versionBadge">v{pkg.version}</div>
          <h1 className="title">VocaJapones</h1>
          <p className="subtitle">Unlocking the Japanese Vibe • Neo-Retro Edition</p>
        </div>

        <div className={`bentoTile ${'statsTile'}`}>
          <span className="statsLabel">Current Stash</span>
          <span className="statsValue">{vocab.length}</span>
        </div>
      </header>

      <div className="filters">
        {levels.map(lvl => (
          <button 
            key={lvl}
            className={`filterBtn ${filter === lvl ? 'active' : ''}`}
            onClick={() => setFilter(lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>

      <main>
        {loading ? (
          <div className="loading">Loading the stash...</div>
        ) : (
          <div className="cardGrid">
            {filteredVocab.map((item) => (
              <WordCard 
                key={item.id}
                japones={item.japones}
                coreana={item.coreana}
                level={item.level}
                conversacion={item.conversacion}
                expresion_similar={item.expresion_similar}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
