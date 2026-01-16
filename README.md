<div align="center">
<img width="907" height="980" alt="스크린샷 2026-01-14 오후 8 09 05" src="https://github.com/user-attachments/assets/b35bc7d4-a5b5-44bf-b07d-2d3bfca57339" />
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
