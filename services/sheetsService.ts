/**
 * Google Sheets에 후원 정보를 저장합니다.
 */
export const saveDonationToSheets = async (data: {
  donorName: string;
  donorEmail?: string;
  coffeeCount: number;
  message?: string;
}): Promise<boolean> => {
  
  // 🔴 중요: 아래 따옴표 안에 본인의 구글 웹 앱 URL(https://script.google.com/...)을 정확히 넣으세요.
  const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxTIQXHQoYvLD3ypkSxe153fYPM3EvRLCu-Ri49DKFVX7KRB8cIQhLZGMqQarLRsB2Y/exec';

  if (!SHEETS_WEB_APP_URL || SHEETS_WEB_APP_URL.includes('여기에')) {
    console.error('❌ Google Sheets URL이 올바르지 않습니다. URL을 확인해주세요.');
    return false;
  }

  try {
    const cost = data.coffeeCount * 4500;
    const date = new Date().toLocaleString('ko-KR');

    const record = {
      date,
      name: data.donorName,
      email: data.donorEmail || '미제공',
      coffee: data.coffeeCount,
      cost,
      message: data.message || '(메시지 없음)'
    };

    console.log('🚀 데이터 전송 시작:', record);

    // 구글 앱스 스크립트로 데이터 전송
    await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', 
      cache: 'no-cache',
      body: JSON.stringify(record)
    });

    console.log('✅ 구글 시트 전송 요청이 완료되었습니다.');
    return true;

  } catch (error) {
    console.error('❌ Google Sheets 저장 실패:', error);
    return false;
  }
};