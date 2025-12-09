"use client"
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [input, setInput] = useState('')
  const [showFooter, setShowFooter] = useState(false)
  const audioCtx = useRef(null)

  const playClick = () => {
    const Context = window.AudioContext || window.webkitAudioContext
    if (!audioCtx.current) {
      audioCtx.current = new Context()
    }
    const ctx = audioCtx.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = 240
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  }

  const handleClick = (value) => {
    playClick()
    setInput((prev) => prev + value)
  }

  const handleClear = () => {
    playClick()
    setInput('')
  }

  const calculate = () => {
    playClick()
    const expr = input.trim()
    if (expr === '') {
      return
    }
    try {
      setInput(eval(expr).toString())
    }
    catch {
      setInput('error')
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setShowFooter(window.scrollY > 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const buttons = [
    'c', '/', '*', '-',
    '7', '8', '9', '+',
    '4', '5', '6', '1',
    '2', '3', '=', '0',
    '.',
  ];

  return (
    <div className="calculator min-h-screen flex flex-col bg-[url('https://assets.designtemplate.io/images/Abstract%20Soft%20Colors%20Background%20for%20Social%20Media%20Ads-HD.webp')] bg-cover bg-center overflow-hidden">
      <div className="flex flex-1 items-center justify-center pb-12 px-4 sm:px-6 mt-6 sm:mt-10">
        <div className="calcard fade-in-up flex flex-col font-bold text-2xl sm:text-3xl border-4 border-blue-400 backdrop-blur-xl bg-white/20 rounded-lg p-6 sm:p-8 shadow-2xl ring-4 ring-blue-300/50 ring-offset-4 ring-offset-transparent max-w-md w-full mx-2 sm:mx-4">

          <input
            type="text"
            value={input}
            className="w-full mb-5 sm:mb-6 px-4 sm:px-6 py-3.5 sm:py-4 text-right text-3xl sm:text-4xl font-bold text-[#515cb9] bg-[#c2bcff] rounded-lg shadow-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-[#515cb9]/30"
            readOnly
            placeholder="0"
          />

          <div className="button mt-3 sm:mt-4 grid grid-cols-4 auto-rows-fr gap-3 sm:gap-4 p-1 sm:p-2">
            {buttons.map((btn) => {
              let className = ""

              if (btn === '=') { className = " row-span-2 bg-[#f5ddc5] text-[#475c6c] p-3 sm:p-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
              else if (btn === '+') { className = " row-span-2 bg-[#c2bcff] text-[#515cb9] p-3 sm:p-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
              else if (btn === '0') { className = " col-span-2 bg-[#c2bcff] text-[#515cb9] p-3 sm:p-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
              else if (btn === 'c') { className = " bg-red-400 text-white p-3 sm:p-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105" }
              else{
                className = "p-3 sm:p-4 text-lg sm:text-xl font-bold rounded-lg bg-gray-50 text-gray-600 shadow-lg transition-all duration-150 active:scale-95 active:shadow-md hover:scale-105"
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

      {showFooter && (
        <footer className="w-full px-6 py-6 mt-auto transition-opacity duration-200">
          <div className="max-w-5xl mx-auto flex items-center justify-between rounded-2xl border border-blue-200/60 bg-white/30 backdrop-blur-xl shadow-lg ring-2 ring-blue-200/30 ring-offset-2 ring-offset-white/10 px-5 py-3 text-sm text-[#475c6c]">
            <span className="font-semibold">Made with ☕ + React</span>
            <span className="text-[#515cb9] font-bold">Stay curious, keep calculating.</span>
          </div>
        </footer>
      )}
    </div>
  );
}
