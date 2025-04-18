import pytest
from app.domains.search.similarity_engine import SimilarityEngine


def test_similarity_engine_basic():
    candidates = ["apple", "banana", "fruit salad"]
    searches = ["apple", "banana", "salad"]
    engine = SimilarityEngine()
    engine.fit(candidates)
    results = engine.query(searches)
    assert len(results) == 3
    # Exact matches for first two
    assert results[0]['match'] == "apple"
    assert isinstance(results[0]['score'], float)
    assert results[1]['match'] == "banana"
    # 'salad' should match 'fruit salad'
    assert results[2]['match'] == "fruit salad"
    assert results[2]['score'] > 0.0
