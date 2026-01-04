// 로컬 스토리지를 사용하여 후원 정보를 저장하는 서비스

export interface DonationRecord {
  id: string;
  timestamp: string;
  donorName: string;
  donorEmail: string;
  coffeeCount: number;
  totalAmount: number;
  message: string;
}

const STORAGE_KEY = 'coffee_donations';

/**
 * 로컬 스토리지에 후원 정보를 저장합니다
 */
export const saveDonationToLocal = (data: {
  donorName: string;
  donorEmail?: string;
  coffeeCount: number;
  message?: string;
}): boolean => {
  try {
    const totalAmount = data.coffeeCount * 5000;
    const timestamp = new Date().toISOString();

    const record: DonationRecord = {
      id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      donorName: data.donorName,
      donorEmail: data.donorEmail || '미제공',
      coffeeCount: data.coffeeCount,
      totalAmount,
      message: data.message || '(메시지 없음)'
    };

    // 기존 데이터 가져오기
    const existingData = getAllDonations();

    // 새 데이터 추가
    existingData.push(record);

    // 로컬 스토리지에 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));

    console.log('✅ 로컬 스토리지에 저장 완료!', record);
    return true;

  } catch (error) {
    console.error('❌ 로컬 스토리지 저장 중 오류:', error);
    return false;
  }
};

/**
 * 로컬 스토리지에서 모든 후원 기록을 가져옵니다
 */
export const getAllDonations = (): DonationRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('❌ 로컬 스토리지 읽기 중 오류:', error);
    return [];
  }
};

/**
 * 로컬 스토리지의 모든 후원 기록을 삭제합니다
 */
export const clearAllDonations = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ 모든 후원 기록이 삭제되었습니다.');
    return true;
  } catch (error) {
    console.error('❌ 로컬 스토리지 삭제 중 오류:', error);
    return false;
  }
};

/**
 * 로컬 스토리지의 데이터를 CSV 형식으로 내보냅니다
 */
export const exportDonationsAsCSV = (): string => {
  const donations = getAllDonations();

  if (donations.length === 0) {
    return '';
  }

  // CSV 헤더
  const headers = ['ID', '일시', '후원자명', '이메일', '커피 개수', '금액', '메시지'];

  // CSV 행
  const rows = donations.map(d => [
    d.id,
    new Date(d.timestamp).toLocaleString('ko-KR'),
    d.donorName,
    d.donorEmail,
    d.coffeeCount,
    d.totalAmount.toLocaleString(),
    d.message
  ]);

  // CSV 문자열 생성
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
};

/**
 * CSV 파일을 다운로드합니다
 */
export const downloadDonationsCSV = (): void => {
  const csv = exportDonationsAsCSV();

  if (!csv) {
    alert('다운로드할 후원 기록이 없습니다.');
    return;
  }

  // BOM 추가 (엑셀에서 한글 깨짐 방지)
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const filename = `커피후원기록_${new Date().toISOString().split('T')[0]}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log(`✅ CSV 파일 다운로드: ${filename}`);
};
