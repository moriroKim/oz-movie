import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, client } from '../client/client';
import MovieCard from '../components/MovieCard';
import '../styles/SearchPage.scss';
import Observer from '../components/Observer';

function SearchPage() {
    const [searchResult, setSearchResult] = useState([]);
    const [page, setPage] = useState(0);
    const { params } = useParams();

    useEffect(() => {
        setSearchResult([]);
    }, [params]);

    useEffect(() => {
        try {
            const fetchSearchResult = async () => {
                const response = await client.get(`search/movie`, {
                    params: {
                        api_key: API_KEY,
                        query: params,
                        language: 'ko-KR',
                        page: page,
                    },
                });
                console.log(response.data.results);
                setSearchResult((prev) => [...prev, ...response.data.results]);
                console.log(searchResult);
            };
            fetchSearchResult();
        } catch (error) {
            console.error(error);
        }
    }, [params, page]);

    return (
        <div className="search__page__container">
            <div className="results">
                {searchResult?.map((item) => (
                    <MovieCard key={item.id} item={item} />
                ))}
            </div>
            <Observer page={page} setPage={setPage} />
        </div>
    );
}

export default SearchPage;
