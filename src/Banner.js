import React, {useState,useEffect} from 'react'
import './Banner.css';
import axios from './axios';
import requests from './Requests';
import TypeWriterEffect from 'react-typewriter-effect';

function Banner() {

    //Movie data
    const [movie, setMovie] = useState([])
    
    useEffect(() => {
        //fetch data
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            // console.log(request.data.results);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
            return request;
        }

        fetchData();
    }, [])
    
    // console.log(movie);
    //Function to truncate longer text
    function truncate(string, n)
    {
        return string.length > n ? string.substr(0, n - 1) + ' . . .' : string;
    }


    return (  
        <header className='banner' style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
        }}> 
            <div className='banner__contents'>
                <h1 className='banner__title'>
                    <TypeWriterEffect
                        textStyle={{
                            fontSize: '3.5rem',
                            fontWeight: 700,

                        }}
                        cursorColor="#fff"
                        hideCursorAfterText ={true}
                        startDelay={100}
                        text={movie?.name || movie?.title || movie?.original_name}
                        typeSpeed={150}
                    />
                    
                </h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My Info</button>
                </div>
                <h1 className='banner__description' id="demo">{truncate(
                    <TypeWriterEffect
                        textStyle={{
                            fontFamily: 'Open Sans',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                        }}
                        hideCursorAfterText ={true}
                        cursorColor="#fff"
                        startDelay={100}
                        text={movie?.overview}
                        typeSpeed={20}
                    />
                    , 200)}</h1>
            </div>

            {/*To add fade out depth like effect use empty div */}
            <div className='banner__fadeButton' />
        </header>
    )
}
 
export default Banner
