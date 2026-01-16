// Google Sheets API를 사용하여 후원 정보를 저장하는 서비스

interface DonationRecord {
  timestamp: string;
  donorName: string;
  donorEmail: string;
  coffeeCount: number;
  totalAmount: number;
  message: string;
}

// Google Apps Script Web App URL (나중에 설정)
const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxTIQXHQoYvLD3ypkSxe153fYPM3EvRLCu-Ri49DKFVX7KRB8cIQhLZGMqQarLRsB2Y/exec';

/**
 * Google Sheets에 후원 정보를 저장합니다
 */
export const saveDonationToSheets = async (data: {
  donorName: string;
  donorEmail?: string;
  coffeeCount: number;
  message?: string;
}): Promise<boolean> => {
  // 1. 함수 호출 확인
  console.log('🔵 함수 호출됨! 전달 데이터:', data);

  if (!SHEETS_WEB_APP_URL) {
    console.warn('⚠️ URL이 설정되지 않았습니다.');
    return false;
  }

  try {
    const cost = data.coffeeCount * 5000;
    const date = new Date().toLocaleString('ko-KR');

    const record = {
      date,
      name: data.donorName,
      email: data.donorEmail || '미제공',
      coffee: data.coffeeCount,
      cost: cost,
      message: data.message || '(메시지 없음)'
    };

    // 2. 전송 직전 로그
    console.log('🚀 구글로 보낼 최종 데이터:', record);

    const response = await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });

    console.log('✅ 전송 요청 완료');
    return true;

  } catch (error) {
    console.error('❌ 저장 에러:', error);
    return false;
  }
};