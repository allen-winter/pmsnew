'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            PMS Pro
          </h1>
          <p className="text-xl text-gray-600">
            Professional Practice Management System
          </p>
          <p className="text-gray-500 mt-2">
            Built with Next.js 14, TypeScript, and Tailwind CSS
          </p>
        </div>

        {/* Counter Card */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Interactive Demo
          </h2>
          <div className="text-6xl font-bold text-blue-600 mb-6">
            {count}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCount(count - 1)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Decrement
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Reset
            </button>
            <button
              onClick={() => setCount(count + 1)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Increment
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold text-gray-800">Fast</h3>
            <p className="text-sm text-gray-600">Built on Next.js for optimal performance</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800">Secure</h3>
            <p className="text-sm text-gray-600">TypeScript for type safety</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800">Modern UI</h3>
            <p className="text-sm text-gray-600">Tailwind CSS for beautiful design</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Designed by Health IT Services (ZA) | Powered by ITDOSE Infosystems PVT LTD
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} PMS Pro. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}