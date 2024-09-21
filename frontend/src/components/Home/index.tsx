import { useState, useEffect } from 'react';
import { fromZonedTime } from 'date-fns-tz';

const Home = () => {
  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    difference: number;
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {timeLeft.difference > 0 ? (
        <div id="countdown">
          <div id="days">
            <p>{timeLeft.days}</p>
            <p>Days</p>
          </div>
          <div id="hours">
            <p>{timeLeft.hours}</p>
            <p>Hours</p>
          </div>
          <div id="minutes">
            <p>{timeLeft.minutes}</p>
            <p>Minutes</p>
          </div>
          <div id="seconds">
            <p>{timeLeft.seconds}</p>
            <p>Seconds</p>
          </div>
        </div>
      ) : (
        <p>🎉</p>
      )}
    </main>
  );
};

const targetDateTime = fromZonedTime('2025-07-19T14:00:00', 'Europe/Budapest');
const calculateTimeLeft = () => {
  const target = new Date(targetDateTime).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, difference };
};

export default Home;
