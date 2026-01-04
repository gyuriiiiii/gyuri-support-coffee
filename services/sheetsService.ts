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
const SHEETS_WEB_APP_URL = import.meta.env.VITE_SHEETS_WEB_APP_URL || '';

/**
 * Google Sheets에 후원 정보를 저장합니다
 */
export const saveDonationToSheets = async (data: {
  donorName: string;
  donorEmail?: string;
  coffeeCount: number;
  message?: string;
}): Promise<boolean> => {
  // Google Sheets API가 설정되지 않은 경우
  if (!SHEETS_WEB_APP_URL) {
    console.warn('⚠️ Google Sheets Web App URL이 설정되지 않았습니다.');
    return false;
  }

  try {
    const totalAmount = data.coffeeCount * 5000;
    const timestamp = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const record: DonationRecord = {
      timestamp,
      donorName: data.donorName,
      donorEmail: data.donorEmail || '미제공',
      coffeeCount: data.coffeeCount,
      totalAmount,
      message: data.message || '(메시지 없음)'
    };

    // Google Apps Script Web App으로 POST 요청
    const response = await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script는 CORS를 지원하지 않으므로
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record)
    });

    // no-cors 모드에서는 응답을 읽을 수 없지만, 요청은 전송됨
    console.log('✅ Google Sheets에 저장 요청 완료!');
    return true;

  } catch (error) {
    console.error('❌ Google Sheets 저장 중 오류:', error);
    return false;
  }
};
