# 📜 gemini.md - Project Constitution: VocaJapones

## 🧩 Data Schemas

### Word/Expression Schema (`vocab.json`)

```json
{
  "id": "string (sequential, e.g., '0001', '0002')",
  "japones": "string (Japanese word/expression)",
  "coreana": "string (Korean meaning)",
  "expresion_similar": "string[] (List of similar expressions/synonyms)",
  "conversacion": "string (A/B dialogue example)",
  "level": "string (OPiC Level, e.g., IM2, IH, AL)",
  "unit": "number (Optional, for course grouping: 1-15)"
}
```

### ChatGPT Extraction Schema

```json
{
  "raw_text": "string (The copy-pasted chat context)",
  "extracted_items": "vocab[]"
}
```

## ⚖️ Behavioral Rules

1. **Device Compatibility:** Must work on mobile (Safari, Chrome, Edge, Brave) and PC.
2. **Contextual Extraction:** Extract words/expressions from ChatGPT conversational text accurately.
3. **Clean Data:** Strictly strip all Markdown tags (e.g., `**`, `*`, `_`, `[ ]`) when storing in JSON or Firestore.
4. **Common Mistakes:** Highlight expressions Koreans often get wrong.
5. **Unit Organization:** 15 units, sorted from easiest (Unit 1) to hardest (Unit 15).
6. **Data Flow:** JSON local -> Firestore sync. Bidirectional sync with Cloud deploy server.
7. **Expression Boundaries:** Use "일본어:" and "한국어:" lines as primary entry boundaries. If multiple expressions are separated by "vs" or commas in these lines, create separate entries for each.
8. **Granular Extraction:** In complex chat segments (e.g., "Sentence Sets"), every Japanese/Korean pair (bullet points) MUST be extracted as an individual entry with a unique ID. No pairs should be omitted.

## 🏗️ Architectural Invariants

1. **A.N.T. Architecture:** Layer 1 (Architecture SOPs), Layer 2 (Navigation/Reasoning), Layer 3 (Deterministic Tools).
2. **Data-First:** No tool coding without confirmed schema.
3. **Self-Healing:** Continuous update of SOPs based on tool failures.
