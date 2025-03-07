import React from 'react'
import Main from './Main'

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6">
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-8">Hexdump to Command Converter for Kindle</h1>
    <p className="text-center text-green-600 mb-4 font-bold">Developed by Cee</p>
    {/* Controls Section */}
    <Main />

  </div>
  )
}
