import React, { useState } from 'react';
import styles from './WordCard.module.css';

interface WordCardProps {
  japones: string;
  coreana: string;
  level: string;
  conversacion?: string;
  expresion_similar?: string[];
}

const WordCard: React.FC<WordCardProps> = ({ 
  japones, 
  coreana, 
  level, 
  conversacion, 
  expresion_similar 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={styles.cardContainer} onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.cardFront}>
          <span className={styles.level}>{level}</span>
          <h2 className={styles.japones}>{japones}</h2>
          <p className={styles.hint}>UNLOCK THE VIBES</p>
        </div>
        <div className={styles.cardBack}>
          <h3 className={styles.coreana}>{coreana}</h3>

          {expresion_similar && expresion_similar.length > 0 && (
            <div className={styles.descSection}>
              <span className={styles.descLabel}>Same Energy</span>
              <p className={styles.similar}>
                {expresion_similar.join(' • ')}
              </p>
            </div>
          )}
          
          {conversacion && (
            <div className={styles.descSection}>
              <span className={styles.descLabel}>Dialog</span>
              <div className={styles.conversacion}>
                {conversacion.split(/(?=[AB]:)/).map((line, i) => (
                  <p key={i} style={{ margin: '0 0 0.5rem 0' }}>{line.trim()}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordCard;
