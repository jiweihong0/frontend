import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-lg">Cybersync AI</span>
            </div>
            <div className="ml-6 flex items-center space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                首頁
              </Link>
              <Link href="/home" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                儀表板
              </Link>
              <Link href="/chat" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                Chat
              </Link>
              <Link href="/threats" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                威脅偵測
              </Link>
              <Link href="/assets" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                資產清冊
              </Link>
              <Link href="/reports" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                安全報告
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="ml-3 relative">
              <div>
                <button type="button" className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none" id="user-menu-button">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <span>U</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 