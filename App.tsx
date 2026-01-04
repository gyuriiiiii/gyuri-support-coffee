import React, { useState } from 'react';
import { DonationModal } from './components/DonationModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이 코드가 핵심입니다. 현재 폴더의 coffee.png를 URL로 변환합니다.
  const coffeeImg = new URL('./coffee.png', import.meta.url).href;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50 text-gray-900">
      <div className="relative z-10 w-full h-full flex flex-col items-center py-8 px-6">
        {/* Top Badge */}
        <div className="mb-6">
          <div className="bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
            SUPPORT CREATOR
          </div>
        </div>

        {/* Title */}
        <header className="flex flex-col items-center space-y-2 mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 text-center">규리에게 커피 사주기</h1>
          <p className="text-gray-600 text-sm md:text-base">
            ICED 아메리카노 한 잔으로 여러분의 응원과 하루를 선물합니다.
          </p>
        </header>

        {/* Coffee Image Container */}
        <div className="flex-grow flex items-center justify-center my-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-80 h-80 md:w-96 md:h-96 bg-amber-100/30 blur-[80px] rounded-full" />
            <img
              src={coffeeImg}
              alt="Iced Coffee"
              className="relative w-72 h-72 md:w-80 md:h-80 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 z-10 animate-wiggle"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full max-w-xl space-y-4 mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-3xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-orange-100 font-medium">SUPPORT NOW</div>
                <div className="text-xl font-bold">커피 후원하기</div>
              </div>
            </div>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <p className="text-center text-gray-500 text-xs md:text-sm">
            안전한 결제를 위해 암호화된 연결을 사용합니다.
          </p>
        </div>
      </div>
      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;