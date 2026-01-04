# EmailJS 설정 가이드 📧

후원 시 자동으로 이메일이 발송되도록 EmailJS를 설정하는 방법입니다.

## 1. EmailJS 회원가입

1. [EmailJS 웹사이트](https://www.emailjs.com/)에 접속
2. **Sign Up** 버튼 클릭하여 회원가입
3. 이메일 인증 완료

## 2. Email Service 연결

1. 대시보드에서 **Add New Service** 클릭
2. Gmail을 선택 (또는 원하는 이메일 서비스)
3. **Connect Account** 클릭하여 Gmail 계정 연결
4. Service ID를 복사해두기 (예: `service_abc123`)

## 3. Email Template 생성

1. 대시보드에서 **Email Templates** 메뉴로 이동
2. **Create New Template** 클릭
3. 다음 내용으로 템플릿 작성:

### Template 설정:
- **Template Name**: `Coffee Donation Notification`
- **Subject**: `{{subject}}`
- **Content**: 아래 내용 복사

```
새로운 커피 후원이 도착했습니다!

━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 후원 일시
{{donation_date}}

👤 후원자 정보
이름: {{donor_name}}
이메일: {{donor_email}}

☕️ 후원 내역
커피 잔 수: {{coffee_count}}잔
후원 금액: {{total_amount}}원

💌 응원 메시지
{{donation_message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━

이 메일은 "규리에게 커피 사주기" 페이지에서 자동으로 생성되었습니다.
후원자에게 감사 인사를 전해보세요! 😊
```

4. **Save** 클릭
5. Template ID를 복사해두기 (예: `template_xyz789`)

### Template Settings (설정 탭):
- **To Email**: `{{to_email}}` 으로 설정 (중요!)
- **From Name**: `커피 후원 시스템` (원하는 이름)
- **Reply To**: `{{donor_email}}` (후원자에게 답장 가능)

## 4. Public Key 확인

1. 대시보드에서 **Account** 메뉴로 이동
2. **API Keys** 섹션에서 **Public Key** 복사 (예: `abc123XYZ`)

## 5. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성 후 다음 내용 입력:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abc123XYZ

# Google Gemini API (기존)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> **중요**: `.env` 파일은 절대 Git에 커밋하지 마세요! (`.gitignore`에 이미 포함됨)

## 6. 테스트

1. 개발 서버 재시작:
   ```bash
   npm run dev
   ```

2. 후원 테스트 진행
3. `minyul0804@gmail.com`으로 이메일이 자동 발송되는지 확인

## 무료 플랜 제한

- 월 200통 무료
- 이후 추가 요금 발생
- 개인 프로젝트에는 충분함

## 문제 해결

### 이메일이 발송되지 않는 경우:

1. **콘솔 에러 확인**: 브라우저 개발자 도구(F12)에서 에러 메시지 확인
2. **EmailJS 대시보드 확인**: Email Logs에서 발송 기록 확인
3. **환경 변수 확인**: Service ID, Template ID, Public Key가 정확한지 확인
4. **스팸 폴더 확인**: Gmail 스팸 폴더 확인

### 자주 하는 실수:

- Template의 "To Email" 필드를 `{{to_email}}`로 설정 안 함
- `.env` 파일 수정 후 서버 재시작 안 함
- 환경 변수 이름 오타 (반드시 `VITE_`로 시작해야 함)

## 완료! 🎉

이제 후원이 들어올 때마다 자동으로 이메일이 발송됩니다!
