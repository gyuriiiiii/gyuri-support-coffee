<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/8a8266aa-2c5e-4632-8046-c5f1d1656d71" />
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/900db2d5-e19a-494a-be97-f0e43bc39741" />
</div>

# 규리에게 커피 사주기

크리에이터 후원 페이지 - 후원자 정보를 로컬 스토리지와 Google Sheets에 자동 저장합니다.

View your app in AI Studio: https://ai.studio/apps/drive/1iWIzGBvDfpA-xOWvnvNElAz6JquSljuA

## 주요 기능

- ☕ 커피 후원 시스템
- 🤖 Gemini AI로 감사 메시지 자동 생성
- 💾 **로컬 스토리지에 자동 저장** (이메일 실패 시에도 데이터 보존)
- 📊 **Google Sheets에 자동 기록** (백업 및 관리)
- 📧 EmailJS를 통한 이메일 알림 (선택사항)
- 📥 후원 기록 CSV 다운로드

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. (선택) Google Sheets 연동 설정 (아래 가이드 참고)

4. Run the app:
   ```bash
   npm run dev
   ```

## 데이터 저장 방식

이 앱은 **복합 저장 방식**을 사용하여 후원 정보를 안전하게 보관합니다:

### 1. 로컬 스토리지 (기본)
- 브라우저의 localStorage에 자동 저장
- 인터넷 연결 없이도 작동
- 별도 설정 불필요

### 2. Google Sheets (백업)
- 스프레드시트에 실시간 기록
- 여러 기기에서 접근 가능
- 엑셀로 다운로드 가능

### 3. 이메일 알림 (선택)
- EmailJS를 통한 이메일 전송
- 실패해도 데이터는 로컬/Sheets에 저장됨

## Google Sheets 설정 가이드

### 1. Google Sheets 생성

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 첫 번째 시트 이름을 `후원기록`으로 변경
3. 첫 번째 행에 헤더 추가:
   ```
   A1: 일시
   B1: 후원자명
   C1: 이메일
   D1: 커피개수
   E1: 금액
   F1: 메시지
   ```

### 2. Google Apps Script 설정

1. 스프레드시트에서 `확장 프로그램` → `Apps Script` 클릭
2. 기본 코드를 삭제하고 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  try {
    // JSON 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 스프레드시트 열기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('후원기록');

    // 데이터 추가
    sheet.appendRow([
      data.timestamp,
      data.donorName,
      data.donorEmail,
      data.coffeeCount,
      data.totalAmount,
      data.message
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '후원 정보가 저장되었습니다.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```


### 3. .env.local 설정

복사한 Web App URL을 [.env.local](.env.local) 파일에 추가:

```env
VITE_SHEETS_WEB_APP_URL="https://script.google.com/macros/s/AKfycbz1HUf-dbH2X2tfk6Wpd3OpOhECGak1Yb5arE37mPE/dev"
```

### 4. 테스트

1. 앱 재시작: `npm run dev`
2. 커피 후원 테스트
3. Google Sheets에서 데이터 확인

## 후원 기록 확인하기

### 로컬 스토리지 데이터 확인

브라우저 개발자 도구 콘솔에서:

```javascript
// 모든 후원 기록 보기
JSON.parse(localStorage.getItem('coffee_donations'))

// CSV로 다운로드
import { downloadDonationsCSV } from './services/localStorageService'
downloadDonationsCSV()
```

### Google Sheets 확인

설정한 스프레드시트에서 실시간으로 확인 가능합니다.

## 문제 해결

### 이메일이 안 와요
- 걱정 마세요! 후원 정보는 로컬 스토리지와 Google Sheets에 저장됩니다.
- 브라우저 콘솔(F12)에서 `✅ 로컬 스토리지에 저장 완료!` 메시지 확인

### Google Sheets에 저장이 안 돼요
1. Apps Script 배포 시 "액세스 권한"을 `모든 사용자`로 설정했는지 확인
2. Web App URL이 `.env.local`에 정확히 입력되었는지 확인
3. 앱을 재시작했는지 확인 (`npm run dev`)

### 데이터가 사라졌어요
- 로컬 스토리지는 브라우저별로 저장됩니다
- 같은 브라우저의 같은 도메인에서만 접근 가능
- 브라우저 캐시 삭제 시 데이터가 삭제될 수 있으니 Google Sheets 백업을 권장합니다

## 기술 스택

- React + TypeScript
- Vite
- Tailwind CSS
- Gemini AI
- EmailJS (선택)
- Google Apps Script (선택)
- LocalStorage API

## 라이선스

MIT
