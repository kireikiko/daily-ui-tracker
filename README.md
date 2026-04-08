# Daily UI Tracker

Daily UI 챌린지 트래커 — Dribbble/Behance/Twitter 업로드 링크 등록해야 완료 처리됨.

## 로컬 실행

```bash
npm install
npm run dev
```

## Vercel 배포 (무료, 카드 불필요)

### 1단계 — GitHub에 올리기

```bash
# 터미널에서 이 폴더 안에서 실행
git init
git add .
git commit -m "first commit"
```

GitHub.com → New repository → `daily-ui-tracker` (Private 권장) → Create

```bash
git remote add origin https://github.com/[내아이디]/daily-ui-tracker.git
git branch -M main
git push -u origin main
```

### 2단계 — Vercel 배포

1. [vercel.com](https://vercel.com) 접속 → GitHub으로 로그인
2. **Add New Project** → `daily-ui-tracker` 선택
3. Framework: **Vite** 자동 감지됨
4. **Deploy** 클릭

→ 1분 안에 `https://daily-ui-tracker-xxx.vercel.app` 주소 생성

### 3단계 — 아이폰 홈 화면 추가

1. Safari에서 Vercel 주소 열기
2. 하단 공유 버튼(□↑) 탭
3. **홈 화면에 추가** 탭
4. 이름 `Daily UI` 로 설정 → 추가

→ 앱처럼 바로 실행 가능!

### 4단계 — 아이폰 단축어 (선택)

1. 단축어 앱 → 새 단축어
2. **URL 열기** 액션 추가 → Vercel 주소 입력
3. 단축어 이름: `Daily UI`
4. 홈 화면에 추가

→ Siri에게 "Daily UI 열어줘" 라고 하면 바로 열림

## 데이터 저장

localStorage에 저장됨 — 같은 기기/브라우저에서는 유지.  
다른 기기에서 쓰려면 각각 독립적으로 저장됨 (동기화 없음).
# daily-ui-tracker
