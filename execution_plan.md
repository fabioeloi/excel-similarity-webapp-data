# Execution Plan: Milestone Roadmap

This file breaks down each milestone into sequential steps to track progress.

## M1: FastAPI Scaffold, Excel I/O & Unit Tests
- [x] Initialize Git repo and push to GitHub
- [x] Add `.gitignore`, Python 3.10+ environment setup
- [x] Create `requirements.txt` with FastAPI, Pydantic, pandas, openpyxl, scikit-learn
- [x] Scaffold FastAPI app (`app/main.py`, router files)
- [x] Define domain folders: `domains/upload`, `domains/search`, `domains/export`
- [x] Implement `ExcelFile` I/O service and write PyTest unit tests
- [x] Implement `SimilarityEngine` stub (vectorizer + NN skeleton) and unit tests
- [x] Ensure `pytest` passes with coverage report

## M2: API Endpoints & Frontend MVP
- [x] Define FastAPI endpoints: `/upload`, `/process`, `/download`
- [x] Write integration tests using FastAPI `TestClient`
- [x] Scaffold React app (`create-react-app` with TypeScript)
- [x] Install Tailwind CSS and configure styles
- [x] Build `UploadForm` component and Axios service for file upload
- [x] Implement file processing flow: upload → call `/process` → receive download link
- [x] Build `ResultsTable` to preview matched items and scores
- [ ] Add Jest + React Testing Library unit tests for components and service

## M3: UX Polish, Error Handling & Edge Cases
- [x] Add client-side validation: file type, max size
- [x] Display loading spinner and progress indicators
- [ ] Handle empty or malformed rows and report errors
- [ ] Show low-similarity warnings and fallback messaging
- [ ] Write end-to-end tests (Cypress or Playwright)

## M4: CI/CD Pipeline & Deployment
- [ ] Configure GitHub Actions workflow (`.github/workflows/ci.yml`)
  - lint: `flake8`, `black --check`, `eslint`
  - test-backend: `pytest --cov`
  - test-frontend: `npm ci && npm test -- --coverage`
  - build: React `npm run build`
- [ ] Add CI badges to `README.md`
- [ ] Set up deployment (Heroku or AWS)
- [ ] Add deploy job in GitHub Actions (trigger on `main`)
- [ ] Verify production build and update docs

---

**Usage:** Check off items as you complete them. Add any sub-tasks directly under each step if needed.
