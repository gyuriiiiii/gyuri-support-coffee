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
  // 환경변수 확인 (SHEETS_WEB_APP_URL)
  if (!SHEETS_WEB_APP_URL) {
    console.warn('⚠️ Google Sheets Web App URL이 설정되지 않았습니다.');
    return false;
  }

  try {
    const cost = data.coffeeCount * 5000;
    const date = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // 시트의 헤더 순서와 이름에 맞춘 데이터 구성
    const record = {
      date: date,
      name: data.donorName,
      email: data.donorEmail || '미제공',
      coffee: data.coffeeCount,
      cost: cost,
      message: data.message || '(메시지 없음)'
    };

    const response = await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script로 보낼 때 필수 설정
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record)
    });

    return true;
  } catch (error) {
    console.error('❌ Google Sheets 저장 중 오류:', error);
    return false;
  }
};