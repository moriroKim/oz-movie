import React, { useEffect, useState } from 'react';
import DetailCard from '../components/DetailCard';
import '../styles/DetailPage.scss';
import { useParams } from 'react-router-dom';
import { client } from '../client/client';
import movieDetailData from '../assets/data/movieDetailData.json';

function DetailPage() {
    const { id } = useParams();
    const [details] = useState(movieDetailData);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     try {
    //         const fetchMovieDetails = async () => {
    //             const response = await client.get(`movie/${id}`, {
    //                 params: {
    //                     language: 'ko-KR',
    //                 },
    //             });

    //             setDetails(response.data);
    //         };
    //         fetchMovieDetails();
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [id]);

    // if (loading) {
    //     return <p>로딩중입니다...</p>;
    // }

    // if (details === null) {
    //     return <p>상세정보를 찾을 수 없습니다.</p>;
    // }

    return <div className="movie-detail">{<DetailCard details={details} />}</div>;
}

export default DetailPage;
