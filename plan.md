# Project Plan

## 1. High-Level Overview
1. User uploads an Excel (`.xlsx`) with two columns:
   - **SearchItems** (col A)
   - **CandidateItems** (col B)
2. Backend vectorizes both lists (e.g. TF-IDF, word embeddings via scikit-learn)
3. For each SearchItem, run a nearest-neighbor lookup in CandidateItems → pick best match + similarity score
4. Return/download Excel with two new columns:
   - **MatchedItem**
   - **SimilarityScore**

## 2. Tech Stack
- **Backend**:
  - Python 3.10+
  - FastAPI (REST)
  - Pydantic (validation)
  - scikit-learn (vectorizer + `NearestNeighbors`)
  - pandas + openpyxl (I/O)
- **Frontend**:
  - React (Create React App)
  - Axios (upload/download)
  - Tailwind CSS
- **Testing**:
  - PyTest (unit + integration)
  - Jest + React Testing Library
- **CI/CD**:
  - GitHub Actions
  - Flake8 / black (lint & format)
  - pytest & jest runners
  - (optionally) deploy to Heroku/AWS via Actions

## 3. Domain-Driven Design
### 3.1. Bounded Contexts
- **UploadContext**
  - Entity: `ExcelFile`
  - Service: `FileStorage` (temp + cleanup)
- **SearchContext**
  - Value Objects: `SearchItem`, `CandidateItem`, `SimilarityResult`
  - Domain Service: `SimilarityEngine` (vectorize + NN lookup)
- **ExportContext**
  - Service: `ResultSerializer` → Excel

### 3.2. Core Entities & Services
```plain
ExcelFile (path, metadata)
SearchItem (text)
CandidateItem (text)
SimilarityResult {
  search: SearchItem,
  match: CandidateItem,
  score: float
}
SimilarityEngine {
  fit(candidates: List[str]) → models…
  query(searches: List[str]) → List[SimilarityResult]
}
```

## 4. Project Structure
```
backend/
├── app/
│   ├── domains/
│   │   ├── upload/
│   │   ├── search/
│   │   └── export/
│   ├── api/          # FastAPI routers
│   ├── services/     # application services
│   └── main.py
├── tests/            # pytest suites
└── requirements.txt

frontend/
├── src/
│   ├── components/   # UploadForm, ResultsTable
│   ├── services/     # api.ts (Axios)
│   └── App.tsx
├── public/
└── package.json

.github/
└── workflows/ci.yml
README.md
```

## 5. TDD Strategy
1. **Backend unit tests**
   - `SimilarityEngine` → known toy data
   - Excel I/O → read/write round-trip
2. **API integration tests** (FastAPI `TestClient`)
3. **Frontend unit tests** (Jest) for form, table, API mocking
4. **End-to-end** (optionally Cypress)

## 6. CI/CD Pipeline (GitHub Actions)
1. **on**: `push, pull_request`
2. **jobs**:
   - **lint**: run `flake8` + `black --check`; `eslint`
   - **test-backend**: install deps, `pytest --cov`
   - **test-frontend**: `npm ci` + `npm test -- --coverage`
   - **build**: (`npm run build`)
   - **deploy** (manual or on `main`): deploy backend + serve React build

## 7. Milestones
1. **M1**: FastAPI scaffold + Excel I/O + simple vectorizer + unit tests
2. **M2**: API endpoints + React upload/download + integration tests
3. **M3**: Polish UI, error handling, edge cases (empty cells, typos)
4. **M4**: CI/CD pipeline + documentation + deploy
