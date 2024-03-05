import React, {useState, useEffect, useRef} from 'react';

function Stopwatch() {

    // hook per controllare se il cronometro stia funzionando
    const [isRunning, setIsRunning] = useState(false);
    // hook per controllare il tempo passato
    const [elapsedTime, SetElapsedTime] = useState(0);
    // hook per azzerare l'intervallo del cronometro
    const intervalIdRef = useRef(null);
    // hook per iniziare il tempo a 0
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                SetElapsedTime(Date.now() - startTimeRef.current);
            }, 10);

            return () => {
                clearInterval(intervalIdRef.current);
            }
        }

    }, [isRunning]); /* con questa dependency, quando montiamo il component e il tempo cambia eseguiamo il codice dentro useEffect */ 

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        SetElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return(
        <div className="stopwatch">
            <div className="display">
                {formatTime()}
            </div>
            <div className='controls'>
                <button className='start-btn' onClick={start}>
                    Start
                </button>
                <button className='stop-btn' onClick={stop}>
                    Stop
                </button>
                <button className='reset-btn' onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Stopwatch