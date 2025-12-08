"use client"
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState('')

  const handleClick = (value) => {
    setInput((prev) => prev + value)
  }

  const handleClear = () => {
    setInput('')
  }

  const calculate = () => {
    try {
      setInput(eval(input).toString())
    }
    catch {
      setInput('error')
    }
  }

  const buttons = [
    'c', '/', '*', '-',
    '7', '8', '9', '+',
    '4', '5', '6', '1',
    '2', '3', '=', '0',
    '.',
  ];

  return (
    <div className="calculator h-screen flex items-center justify-center bg-[url('https://assets.designtemplate.io/images/Abstract%20Soft%20Colors%20Background%20for%20Social%20Media%20Ads-HD.webp')] bg-cover bg-center overflow-hidden">
      <div className="calcard fade-in-up flex flex-col font-bold text-3xl border-4 border-blue-400 backdrop-blur-xl bg-white/20 rounded-lg p-8 shadow-2xl ring-4 ring-blue-300/50 ring-offset-4 ring-offset-transparent max-w-md w-full mx-4">

        <input
          type="text"
          value={input}
          className="w-full mb-6 px-6 py-4 text-right text-4xl font-bold text-[#515cb9] bg-[#c2bcff] rounded-lg shadow-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-[#515cb9]/30"
          readOnly
          placeholder="0"
        />

        <div className="button mt-4 grid grid-cols-4 auto-rows-fr gap-4 p-2">
          {buttons.map((btn) => {
            let className = ""

            if (btn === '=') { className = " row-span-2 bg-[#f5ddc5] text-[#475c6c] p-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
            else if (btn === '+') { className = " row-span-2 bg-[#c2bcff] text-[#515cb9] p-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
            else if (btn === '0') { className = " col-span-2 bg-[#c2bcff] text-[#515cb9] p-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
            else if (btn === 'c') { className = " bg-red-400 text-white p-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
            else{
              className = "p-4 text-xl font-bold rounded-lg bg-gray-50 text-gray-600 shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105"
            }

            return (
              <button
                key={btn}
                className={className}
                onClick={() => {
                  if (btn === '=') {
                    calculate()
                  }
                  else if (btn === 'c') {
                    handleClear()
                  }
                  else {
                    handleClick(btn)
                  }
                }}
              >
                {btn}
              </button>
            )
          })}
        </div>

      </div>
    </div>
  );
}
