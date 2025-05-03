import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative font-[family-name:var(--font-geist-sans)]">
      {/* 背景图层 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image 
          src="/images/security-background.svg"
          alt="Security Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* 内容层 */}
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start backdrop-blur-sm p-8 rounded-2xl bg-white/10">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-4 text-white">Cybersync AI</h1>
            <p className="text-xl mb-8 text-gray-200">全面的安全監控和威脅檢測解決方案</p>
            <Link 
              href="/home" 
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 inline-flex"
            >
              查看儀表板
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg border border-white/10 text-white hover:bg-white/30 transition-all">
              <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">即時監控</h3>
              <p className="text-gray-200">獲取潛在安全威脅的即時警報和通知。</p>
            </div>
            
            <div className="p-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg border border-white/10 text-white hover:bg-white/30 transition-all">
              <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">高級分析</h3>
              <p className="text-gray-200">強大的分析功能，檢測安全數據中的模式和異常。</p>
            </div>
            
            <div className="p-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg border border-white/10 text-white hover:bg-white/30 transition-all">
              <div className="w-12 h-12 bg-yellow-600/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">自定義規則</h3>
              <p className="text-gray-200">創建適合您組織需求的自定義檢測規則。</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
