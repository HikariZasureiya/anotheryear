'use client'

import { useEffect, useState, useRef } from "react";
import { WordRotate } from "./compo/word";
import { Pacifico , Anton } from "next/font/google";
import Image from 'next/image';
import Firework from "./fire";
import { Confetti } from "./fire";


const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

const Digit = ({ counter }) => {
  return (
    <div>
      <WordRotate
        className=" z-5 text-[30px] sm:text-[40px] md:text-[60px] lg:text-[70px]  sm:mr-1 font-bold text-red-500 min-w-[20px] sm:min-w-[40px]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient
          backgroundClip: 'text', // Ensure the gradient is applied to the text itself
          WebkitBackgroundClip: 'text', // For Safari support
          display: 'inline-block', // Required for background-clip to work
        }}
        words={[counter === undefined ? '0' : counter]} // Words to display
      />
    </div>
  );
}

const Displayer = ({ D1, D0, H1, H0, M1, M0, S1, S0 }) => {
  return (
    <div className=" z-5 flex flex-wrap justify-center items-center ">
      <div className="flex items-center  sm:mr-1">
        <Digit counter={D1} />
        <Digit counter={D0} />
      </div>
      <div className="flex items-center mr-2 sm:mr-1 text-[30px] sm:text-[50px] md:text-[60px] lg:text-[70px]">
        :
      </div>
      <div className="flex items-center mr-2 sm:mr-1">
        <Digit counter={H1} />
        <Digit counter={H0} />
      </div>
      <div className="flex items-center mr-2 sm:mr-1 text-[30px] sm:text-[50px] md:text-[60px] lg:text-[70px]">
        :
      </div>
      <div className="flex items-center mr-2 sm:mr-1">
        <Digit counter={M1} />
        <Digit counter={M0} />
      </div>
      <div className="flex items-center mr-2 sm:mr-1 text-[30px] sm:text-[50px] md:text-[60px] lg:text-[70px]">
        :
      </div>
      <div className="flex items-center sm:mr-1">
        <Digit counter={S1} />
        <Digit counter={S0} />
      </div>
    </div>
  );
}

const T1 = () => {
  return (
    <div
      className={`${pacifico.className} text-black text-[40px] sm:text-[40px] md:text-[50px] text-center mb-10`}
    >
      See? The year's gonna end in
    </div>
  );
}

const T2 = () => {
  const confettiRef = useRef();
  return (
    <div
      className={`${anton.className} text-[30px] text-black sm:text-[40px] md:text-[70px] text-center mb-5`}
    >
      🎉 HAPPY NEW YEAR! 🎉
      <div
        className={`${anton.className} text-[40px] sm:text-[40px] md:text-[80px] text-center `}
        style={{
          backgroundImage: 'linear-gradient(to right, #c2e59c, #64b3f4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        2025
      </div>

      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-5 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    
    </div>

    
  );
}

export default function Home() {
  const [counter, setCounter] = useState(null);
  const [textthere, setText] = useState(null);
  const pic = useRef();
  const bg = useRef();
 

  useEffect(() => {
    
    const date = new Date();
    if (date.getFullYear() > 2024) {
      setCounter(null);
      setText(<T2 />);
    } else {
      setCounter(date);
      setText(<T1 />);
    }

    // Set up interval for countdown

    if (date.getFullYear() <= 2024){
        const jump = setInterval(() => {
          const newDate = new Date();
          if (newDate.getFullYear() > 2024) {

            setCounter(null);
            
            clearInterval(jump);
            setText(<T2 />);
          } else {

            setCounter(newDate);
            setText(<T1 />);
          }
        }, 1000);

        return () => clearInterval(jump);
      }

      else{
      const newDate = new Date();

          setCounter(null);
          setText(<T2 />);
      }
  }, []);

  return (
    <div className="bg-yellow-200" >
       
      <Image
        ref={pic}
        src="https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif"
        alt="agif"
        width={700}
        height={700}
        className="z-20 absolute inset-0 w-full h-full object-cover hidden"
      />
      <div className=" z-10 w-full min-h-screen flex flex-col justify-center items-center py-4 sm:py-10">
        {/* Display Text immediately */}
        <div
          className={`${pacifico.className} text-[20px] sm:text-[40px] md:text-[50px] text-center mb-10`}
        >
          {textthere}
        </div>
        <Displayer
          D1={counter ? String(31 - counter.getDate()).padStart(2, '0')[0] : '0'}
          D0={counter ? String(31 - counter.getDate()).padStart(2, '0')[1] : '0'}
          H1={counter ? String(23 - counter.getHours()).padStart(2, '0')[0] : '0'}
          H0={counter ? String(23 - counter.getHours()).padStart(2, '0')[1] : '0'}
          M1={counter ? String(59 - counter.getMinutes()).padStart(2, '0')[0] : '0'}
          M0={counter ? String(59 - counter.getMinutes()).padStart(2, '0')[1] : '0'}
          S1={counter ? String(59 - counter.getSeconds()).padStart(2, '0')[0] : '0'}
          S0={counter ? String(59 - counter.getSeconds()).padStart(2, '0')[1] : '0'}
        />
        <div
          className={`${pacifico.className} text-black text-[25px] sm:text-[30px] md:text-[40px] mt-10 mb-5 text-center`}
        >
          Click to see the memories we made in 2024
        </div>

        <audio ref={bg} src="/assets/rick.mp3" type="audio/mp3" controls className="hidden" onEnded={()=>{
          bg.current.play();
        }} />

        <button
          onClick={() => {
            pic.current.style.display = 'block';
            bg.current.play();
          }}
          className="credbutton sm:text-[18px] lg:text-[20px] mt-10"
        >
          Click me  :D
        </button>
      </div>
    </div>
  );
}
