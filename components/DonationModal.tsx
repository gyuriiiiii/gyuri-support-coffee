import React, { useState } from 'react';
import { generateThankYouMessage } from '../services/geminiService';
import { sendDonationEmail } from '../services/emailService';
import { saveDonationToSheets } from '../services/sheetsService';
import { saveDonationToLocal } from '../services/localStorageService';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coffeeCount, setCoffeeCount] = useState(1);
  const [message, setMessage] = useState('');
  const [thankYouNote, setThankYouNote] = useState('');

  // Creator's email address
  const CREATOR_EMAIL = 'minyul0804@gmail.com';

  if (!isOpen) return null;

  const handleDonate = async () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요!");
      return;
    }

    setStep('processing');

    try {
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate AI response
      const note = await generateThankYouMessage(name, coffeeCount, message);
      setThankYouNote(note);

      // 후원 데이터 준비
      const donationData = {
        donorName: name,
        donorEmail: email,
        coffeeCount,
        message
      };

      // 1. 로컬 스토리지에 저장 (항상 성공)
      const localSaved = saveDonationToLocal(donationData);
      if (localSaved) {
        console.log('✅ 로컬 스토리지에 저장 완료!');
      }

      // 2. Google Sheets에 저장 (백업)
      saveDonationToSheets(donationData).then(sheetsSaved => {
        if (sheetsSaved) {
          console.log('✅ Google Sheets에 저장 완료!');
        } else {
          console.warn('⚠️ Google Sheets 저장 실패 (로컬에는 저장됨)');
        }
      }).catch(err => {
        console.warn('⚠️ Google Sheets 저장 중 오류:', err);
      });

      // 3. 이메일 전송 시도 (선택적)
      const emailSent = await sendDonationEmail({
        creatorEmail: CREATOR_EMAIL,
        donorName: name,
        donorEmail: email,
        coffeeCount,
        message
      });

      if (emailSent) {
        console.log('✅ 후원 이메일이 성공적으로 전송되었습니다!');
      } else {
        console.warn('⚠️ 이메일 전송에 실패했지만 후원 정보는 저장되었습니다.');
      }

      setStep('success');
    } catch (error) {
      console.error('❌ 후원 처리 중 오류 발생:', error);
      alert('후원 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      setStep('input');
    }
  };

  const reset = () => {
    setStep('input');
    setName('');
    setEmail('');
    setMessage('');
    setCoffeeCount(1);
    setThankYouNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content - Light Theme */}
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 text-gray-900 overflow-hidden animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {step === 'input' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-black mb-2 text-gray-900">커피 후원하기 ☕️</h2>
              <p className="text-gray-500 text-sm">규리에게 시원한 아이스 커피 한 잔을 선물하세요.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">이름 (또는 닉네임)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all"
                  placeholder="규리팬1호"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  이메일 <span className="text-gray-400 font-normal">(선택)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-gray-500 mt-1">답장을 원하시면 이메일을 남겨주세요</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">커피 몇 잔?</label>
                <div className="flex gap-2">
                  {[1, 3, 5].map((count) => (
                    <button
                      key={count}
                      onClick={() => setCoffeeCount(count)}
                      className={`flex-1 py-3 rounded-lg border font-medium transition-all ${
                        coffeeCount === count 
                          ? 'bg-amber-500 border-amber-600 text-white shadow-md' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {count}잔 ☕️
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">응원 메시지</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all resize-none h-24"
                  placeholder="화이팅! 항상 응원해요 :)"
                />
              </div>
            </div>

            <button 
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>후원하기</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">결제 처리 중...</h3>
              <p className="text-gray-500 text-sm mt-1">규리에게 커피를 배달하고 있어요!</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎉</span>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">후원 성공!</h2>
              <p className="text-gray-600">규리가 메시지를 보냈어요:</p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 relative">
              <div className="absolute -top-3 -left-2 text-4xl text-amber-200 transform -rotate-12">❝</div>
              <p className="text-lg leading-relaxed italic text-gray-800 font-medium">
                {thankYouNote}
              </p>
              <div className="absolute -bottom-6 -right-2 text-4xl text-amber-200 transform rotate-12">❞</div>
            </div>

            <button 
              onClick={reset}
              className="mt-4 w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-bold py-3 rounded-xl transition-all shadow-sm"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};