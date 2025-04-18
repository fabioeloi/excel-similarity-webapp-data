from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from typing import List, Dict, Any

class SimilarityEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.nn = NearestNeighbors(metric='cosine')
        self.candidates: List[str] = []

    def fit(self, candidates: List[str]) -> None:
        """Fit vectorizer and nearest neighbor model on candidate items."""
        self.candidates = candidates
        X = self.vectorizer.fit_transform(candidates)
        self.nn.fit(X)

    def query(self, searches: List[str]) -> List[Dict[str, Any]]:
        """Query searches and return best match and similarity score."""
        Xq = self.vectorizer.transform(searches)
        distances, indices = self.nn.kneighbors(Xq, n_neighbors=1)
        results: List[Dict[str, Any]] = []
        for dist_arr, idx_arr, search_text in zip(distances, indices, searches):
            idx = idx_arr[0]
            score = 1 - dist_arr[0]
            results.append({
                'search': search_text,
                'match': self.candidates[idx],
                'score': score
            })
        return results
