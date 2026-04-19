import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const CHALLENGES = [
  { id: 1, title: "Sign Up", desc: "회원가입 페이지, 모달, 폼, 또는 앱 화면을 디자인해. 이벤트 참가, 경품 응모, 서비스 가입 등 어떤 종류든 상관없어." },
  { id: 2, title: "Credit Card Checkout", desc: "신용카드 결제 폼이나 페이지를 디자인해. 카드 번호, 유효기간, 보안코드 같은 필수 요소들을 잊지 마." },
  { id: 3, title: "Landing Page", desc: "랜딩 페이지를 디자인해. 어떤 제품이나 서비스야? 전체적인 분위기는? 모바일에서도 잘 작동해?" },
  { id: 4, title: "Calculator", desc: "계산기를 디자인해. 일반 계산기, 공학용 계산기, 또는 모기지나 팁 계산기 같은 특수 목적 계산기도 좋아." },
  { id: 5, title: "App Icon", desc: "앱 아이콘을 디자인해. 어떤 앱이야? 경쟁 앱들과 어떻게 차별화할 거야?" },
  { id: 6, title: "User Profile", desc: "유저 프로필을 디자인해. 가장 중요한 정보, 레이블, 요소들을 잘 생각해봐. 아바타, 이름, 통계, 그 외 필요한 것들." },
  { id: 7, title: "Settings", desc: "설정 화면을 디자인해. 폰? 웹앱? TV? 어떤 기기나 서비스를 위한 설정이야?" },
  { id: 8, title: "404 Page", desc: "404 에러 페이지를 디자인해. 브랜드나 프로젝트 분위기에 맞아? 유저한테 도움이 돼?" },
  { id: 9, title: "Music Player", desc: "뮤직 플레이어를 디자인해. 브라우저 기반이나 앱(예: Spotify, SoundCloud). 컨트롤, 배치, 앨범 아트 등을 고려해봐." },
  { id: 10, title: "Social Share", desc: "소셜 공유 버튼/아이콘을 디자인해. 크기, 이미지, 주변 콘텐츠를 잘 생각해봐. 눈에 띄고 효과적이어야 해." },
  { id: 11, title: "Flash Message", desc: "에러 메시지와 성공 메시지 두 가지 플래시 메시지를 디자인해. 회원가입 폼? 새 글 작성? 팔로우 액션?" },
  { id: 12, title: "E-Commerce Shop", desc: "이커머스 쇼핑 화면을 디자인해. 단순해? 복잡해? 개성이 있어, 아니면 실용적이야?" },
  { id: 13, title: "Direct Messaging", desc: "다이렉트 메시지 앱, 프로필, 또는 채팅창을 디자인해. 대화는 어떻게 보여? 메시지 시간, 읽음 표시 등은?" },
  { id: 14, title: "Countdown Timer", desc: "카운트다운 타이머를 디자인해. 뭘 카운트다운해? 긴박감은 어떻게 표현할 거야?" },
  { id: 15, title: "On/Off Switch", desc: "온/오프 스위치를 디자인해. 뭘 켜고 끄는 거야? 인터랙티브하게 만들어봐." },
  { id: 16, title: "Pop-Up / Overlay", desc: "팝업 또는 오버레이를 디자인해. 뉴스레터 구독? 사이트 접근 제한? 프로모션 오퍼?" },
  { id: 17, title: "Purchase Receipt", desc: "구매 영수증을 디자인해. 디지털이야, 종이야? 어떤 정보가 필요하고 어떤 건 없어도 돼?" },
  { id: 18, title: "Analytics Chart", desc: "분석 차트를 디자인해. 웹용이야 앱용이야? 어떤 종류의 데이터를 보여줘?" },
  { id: 19, title: "Leaderboard", desc: "리더보드를 디자인해. 게임? 학교? 순위는 어떻게 표시할 거야?" },
  { id: 20, title: "Location Tracker", desc: "위치 트래커를 디자인해. 달리기 앱? 택배 추적? 친구 만나기?" },
  { id: 21, title: "Home Monitoring Dashboard", desc: "홈 모니터링 대시보드를 디자인해. 스마트홈 컨트롤, 온도, 보안, 조명 등을 생각해봐." },
  { id: 22, title: "Search", desc: "검색 기능을 디자인해. 뭘 검색해? 결과는 어떻게 나와? 일반 검색이야, 특수 검색이야?" },
  { id: 23, title: "Onboarding", desc: "온보딩 프로세스를 디자인해. 어떤 제품이나 서비스야? 몇 단계야?" },
  { id: 24, title: "Boarding Pass", desc: "탑승권을 디자인해. 여행자에게 필요한 정보는? 인쇄본이랑 모바일 버전이 어떻게 달라?" },
  { id: 25, title: "TV App", desc: "TV 앱을 디자인해. 영화 스트리밍? 뉴스? 게임? 아니면 독창적인 서비스?" },
  { id: 26, title: "Subscribe", desc: "구독 폼이나 페이지를 디자인해. 뭘 구독하는 거야? 어떤 정보가 필요해?" },
  { id: 27, title: "Dropdown", desc: "드롭다운을 디자인해. 폼용? 네비게이션용? 내용은 뭐야?" },
  { id: 28, title: "Contact Us", desc: "문의하기 페이지를 디자인해. 유저한테 어떤 정보를 받아야 해? 지도나 찾아오는 길도 있어?" },
  { id: 29, title: "Map", desc: "지도를 디자인해. 앱? 웹사이트? 인터랙티브해? 뭘 보여줘?" },
  { id: 30, title: "Pricing", desc: "요금제 페이지를 디자인해. 무엇을 제공해? 몇 가지 티어야? 추천 옵션은 어떻게 강조해?" },
  { id: 31, title: "File Upload", desc: "파일 업로드 페이지나 기능을 디자인해. 어떤 파일? 진행 바가 있어? 드래그 앤 드롭은?" },
  { id: 32, title: "Crowdfunding Campaign", desc: "크라우드펀딩 캠페인 페이지를 디자인해. 제품이야, 명분이야? 가장 중요한 정보는 뭐야?" },
  { id: 33, title: "Customize Product", desc: "제품 커스터마이징 페이지를 디자인해. 뭘 바꿀 수 있어? 색상, 사이즈, 소재?" },
  { id: 34, title: "Car Interface", desc: "자동차 인터페이스를 디자인해. 내비게이션? 음악? 에어컨? 운전 중에도 안전하게 사용할 수 있어?" },
  { id: 35, title: "Blog Post", desc: "블로그 포스트를 디자인해. 주제는? 어떻게 구성돼? 읽기 쉽고 매력적이야?" },
  { id: 36, title: "Special Offer", desc: "프로모션을 디자인해. 제품이 뭐고 어떻게 홍보해? 이메일 프로모션? 웹사이트 세일 배너? 1+1 오퍼? 할인율이나 금액이 얼마나 매력적으로 보여?" },
  { id: 37, title: "Weather", desc: "날씨 앱이나 위젯을 디자인해. 시간별? 주간? 어떤 데이터가 가장 중요해?" },
  { id: 38, title: "Calendar", desc: "캘린더를 디자인해. 앱? 웹앱? 일정 관리 툴?" },
  { id: 39, title: "Testimonials", desc: "추천사 페이지나 섹션을 디자인해. 리뷰는 어떻게 보여줘? 사진? 별점? 영상?" },
  { id: 40, title: "Recipe / Food Order", desc: "레시피나 음식 주문 페이지를 디자인해. 음식은 뭐야? 어떻게 설명해? 주문이나 조리는 어떻게 해?" },
  { id: 41, title: "Workout Tracker", desc: "운동 트래커를 디자인해. 어떤 수치를 추적해? 시간 경과에 따른 진도? 소셜 기능은?" },
  { id: 42, title: "To-Do List", desc: "할 일 목록을 디자인해. 항목은 어떻게 추가해? 완료 표시는? 우선순위는?" },
  { id: 43, title: "Food / Drink Menu", desc: "음식이나 음료 메뉴를 디자인해. 레스토랑? 바? 카페? 인쇄물이야 디지털이야?" },
  { id: 44, title: "Favourites", desc: "즐겨찾기 페이지를 디자인해. 뭘 즐겨찾기 하는 거야? 제품, 아티클, 노래?" },
  { id: 45, title: "Info Card", desc: "정보 카드를 디자인해. 어떤 정보를 담아? 어떻게 구성해? 펼쳐지는 방식이야?" },
  { id: 46, title: "Invoice", desc: "인보이스를 디자인해. 어떤 내용을 청구해? 클라이언트는 누구야? 어떤 세부 정보가 필요해?" },
  { id: 47, title: "Activity Feed", desc: "활동 피드를 디자인해. SNS? 프로젝트 관리 툴? 어떤 이벤트를 보여줘?" },
  { id: 48, title: "Coming Soon", desc: "'곧 출시' 페이지를 디자인해. 뭐가 런칭해? 기대감은 어떻게 만들어? 이메일 신청 기능은?" },
  { id: 49, title: "Notifications", desc: "알림을 디자인해. 앱? 이메일? 어떤 종류의 알림? 우선순위는 어떻게 표시해?" },
  { id: 50, title: "Job Listing", desc: "채용 공고를 디자인해. 어떤 포지션이야? 어떤 정보가 필요해? 어떻게 지원해?" },
  { id: 51, title: "Press Page", desc: "언론 보도 페이지를 디자인해. 어떤 회사야? 어떤 미디어 자료와 정보가 필요해?" },
  { id: 52, title: "Daily UI Logo", desc: "Daily UI 로고를 디자인해! 네 스타일로 재해석해봐. 52일 달성을 축하해!" },
  { id: 53, title: "Header Navigation", desc: "헤더 네비게이션을 디자인해. 어떤 사이트나 앱이야? 모바일에서는 어떻게 바뀌어?" },
  { id: 54, title: "Confirmation Dialog", desc: "확인 다이얼로그를 디자인해. 유저가 어떤 액션을 확인하는 거야? 삭제? 구매? 전송?" },
  { id: 55, title: "Icon Set", desc: "아이콘 세트를 디자인해. 무엇을 위한 아이콘이야? 몇 개야? 라인, 필드, 3D 중 어떤 스타일?" },
  { id: 56, title: "Breadcrumbs", desc: "브레드크럼 네비게이션을 디자인해. 어디에 나타나? 몇 단계야? 계층 구조를 어떻게 표현해?" },
  { id: 57, title: "Video Player", desc: "비디오 플레이어를 디자인해. 어떤 컨트롤이 보여? 진행 바? 볼륨? 전체화면?" },
  { id: 58, title: "Shopping Cart", desc: "장바구니를 디자인해. 어떤 상품이 담겨 있어? 수량은 어떻게 바꿔? 합계는 어떻게 보여줘?" },
  { id: 59, title: "Background Pattern", desc: "배경 패턴을 디자인해. 웹사이트, 앱, 브랜딩 중 어디에 써? 은은해, 아니면 강렬해?" },
  { id: 60, title: "Color Picker", desc: "색상 피커를 디자인해. 디자인 툴? 제품 커스터마이저? 특정 색상은 어떻게 입력해?" },
  { id: 61, title: "Redeem Coupon", desc: "쿠폰 사용 플로우를 디자인해. 어디에 입력해? 어떤 피드백을 줘?" },
  { id: 62, title: "Flight Search", desc: "항공편 검색을 디자인해. 어떤 필터가 있어? 결과는 어떻게 보여줘? 편도, 왕복?" },
  { id: 63, title: "Best Of", desc: "'베스트' 목록이나 페이지를 디자인해. 무엇의 베스트야? 연도별? 장르별? 카테고리별? 어떻게 큐레이션해?" },
  { id: 64, title: "Select User Type", desc: "유저 타입 선택 화면을 디자인해. 어떤 타입들이 있어? 선택에 따라 경험이 어떻게 달라져?" },
  { id: 65, title: "Notes Widget", desc: "노트 위젯을 디자인해. 데스크탑? 폰? 노트를 어떻게 만들고, 수정하고, 정리해?" },
  { id: 66, title: "Statistics", desc: "통계 페이지나 섹션을 디자인해. 어떤 데이터를 보여줘? 어떻게 시각화해? 대시보드야, 리포트야?" },
  { id: 67, title: "Hotel Booking", desc: "호텔 예약 페이지를 디자인해. 어떤 정보가 필요해? 가용성과 가격은 어떻게 보여줘?" },
  { id: 68, title: "Flight Booking", desc: "항공편 예약 페이지를 디자인해. 어떤 단계들이 있어? 좌석 선택은 어떻게 보여줘?" },
  { id: 69, title: "Trending", desc: "트렌딩 섹션을 디자인해. 트렌딩 주제? 제품? 음악? 인기도는 어떻게 시각화해?" },
  { id: 70, title: "Event Listing", desc: "이벤트 목록을 디자인해. 어떤 이벤트야? 정보는 어떻게 구성해? 필터 옵션은?" },
  { id: 71, title: "Pagination", desc: "페이지네이션을 디자인해. 블로그? 검색 결과? 몇 페이지야? 이전/다음이야, 번호야?" },
  { id: 72, title: "Image Slider", desc: "이미지 슬라이더나 캐러셀을 디자인해. 어떤 이미지야? 내비게이션 화살표? 점? 자동 재생?" },
  { id: 73, title: "Virtual Reality", desc: "VR 인터페이스나 경험을 디자인해. 3D 공간에서 UI는 어떻게 작동해? 어떤 인터랙션 모델이야?" },
  { id: 74, title: "Download App", desc: "앱 다운로드 페이지를 디자인해. 어떤 플랫폼? 어떤 정보가 다운로드를 설득해?" },
  { id: 75, title: "Pre-Loader", desc: "프리로더 애니메이션을 디자인해. 웹사이트야 앱이야? 브랜드를 어떻게 반영해?" },
  { id: 76, title: "Loading...", desc: "로딩 상태를 디자인해. 피드? 폼 제출? 스켈레톤 스크린이야, 스피너야?" },
  { id: 77, title: "FAQ", desc: "FAQ 섹션을 디자인해. 질문은 어떻게 구성해? 아코디언이야, 정적이야? 검색 기능은?" },
  { id: 78, title: "Tip Calculator", desc: "팁 계산기를 디자인해. 더치페이는 어떻게 해? 퍼센트 옵션은? 여러 명이서 나눌 때는?" },
  { id: 79, title: "Itinerary", desc: "여행 일정을 디자인해. 날짜별? 타임라인? 가장 중요한 정보는 뭐야?" },
  { id: 80, title: "Date Picker", desc: "날짜 선택기를 디자인해. 단일 날짜야 범위야? 시간대나 선택 불가 날짜는 어떻게 처리해?" },
  { id: 81, title: "Status Update", desc: "상태 업데이트 기능을 디자인해. SNS? 프로젝트 툴? 글자 수 제한은?" },
  { id: 82, title: "Form", desc: "폼을 디자인해. 무슨 목적이야? 어떤 필드가 필요해? 에러는 어떻게 처리해?" },
  { id: 83, title: "Button", desc: "버튼을 디자인해. 어떤 액션을 위한 거야? 프라이머리, 세컨더리, 파괴적 액션? 호버, 활성, 비활성 상태는?" },
  { id: 84, title: "Badge", desc: "뱃지나 태그를 디자인해. 제품 라벨? 유저 달성 배지? 알림 카운트?" },
  { id: 85, title: "Pagination", desc: "페이지네이션을 다시 디자인해봐 — 다른 패턴이나 맥락을 탐구해봐." },
  { id: 86, title: "Progress Bar", desc: "진행 바를 디자인해. 업로드? 다단계 폼? 스킬 레벨 표시?" },
  { id: 87, title: "Tooltip", desc: "툴팁을 디자인해. 어떤 정보를 보여줘? 호버나 탭으로 트리거? 위치는?" },
  { id: 88, title: "Stepper", desc: "스테퍼를 디자인해. 수량 입력? 다단계 플로우? 최소/최대값은?" },
  { id: 89, title: "Terms of Service", desc: "이용약관 페이지를 디자인해. 빽빽한 법적 텍스트를 어떻게 읽기 쉽게 만들어? 동의/거부?" },
  { id: 90, title: "Create New", desc: "'새로 만들기' 플로우를 디자인해. 뭘 만드는 거야? 프로젝트, 게시물, 문서? 첫 단계는?" },
  { id: 91, title: "Curated For You", desc: "개인화 추천 섹션을 디자인해. 뭘 추천해? 취향을 어떻게 파악해?" },
  { id: 92, title: "Language Learning", desc: "언어 학습 기능이나 앱을 디자인해. 어떤 언어? 어떤 종류의 연습? 진도 추적은?" },
  { id: 93, title: "Workout of the Day", desc: "오늘의 운동 기능을 디자인해. 어떤 운동? 시간? 난이도? 진도는?" },
  { id: 94, title: "News", desc: "뉴스 피드, 기사, 또는 속보 알림을 디자인해. 어떤 매체? 어떤 기사? 모바일이야 데스크탑이야?" },
  { id: 95, title: "Product Tour", desc: "제품 투어나 기능 워크스루를 디자인해. 어떤 제품? 몇 단계? 건너뛰기 옵션은?" },
  { id: 96, title: "Image Gallery", desc: "이미지 갤러리를 디자인해. 사진 포트폴리오? 이커머스 제품? 그리드야 메이슨리야?" },
  { id: 97, title: "Giveaway", desc: "경품 이벤트 페이지를 디자인해. 경품은 뭐야? 어떻게 참여해? 카운트다운 타이머는?" },
  { id: 98, title: "Newsfeed", desc: "뉴스피드를 디자인해. SNS 스타일? 블로그 애그리게이터? 어떤 카드와 인터랙션이야?" },
  { id: 99, title: "Categories", desc: "카테고리 페이지를 디자인해. 쇼핑몰? 블로그? 앱? 각 카테고리를 어떻게 시각화해?" },
  { id: 100, title: "Redesign Daily UI", desc: "Daily UI 웹사이트를 리디자인해! 100일을 해냈어. 이제 모든 것의 시작이었던 그 사이트를 새롭게 만들어봐. 축하해! 🎉" },
];

const NAG = [
  "어제도 씹었잖아 😤", "오늘은 진짜 해야 함", "포트폴리오가 울고 있어",
  "10분이면 돼. 진짜로.", "안 하면 나중에 더 힘들어",
  "디자이너는 손을 움직여야 함", "일단 열기만 해봐",
];

const REFS = (title) => {
  const q = encodeURIComponent(title);
  const qd = encodeURIComponent(title.replace(/\s+/g, "-").toLowerCase());
  return [
    { label: "Mobbin", color: "#7fff7f", url: `https://mobbin.com/search/screens?q=${q}` },
    { label: "Dribbble", color: "#ffdd57", url: `https://dribbble.com/search/${qd}` },
    { label: "Behance", color: "#7fb3ff", url: `https://www.behance.net/search/projects?search=${q}+ui` },
    { label: "Pinterest", color: "#ff9f7f", url: `https://pinterest.com/search/pins/?q=${q}+ui+design` },
  ];
};

const UPLOAD_PLATFORMS = [
  { key: "dribbble", label: "Dribbble", color: "#ffdd57", placeholder: "https://dribbble.com/shots/..." },
  { key: "behance", label: "Behance", color: "#7fb3ff", placeholder: "https://behance.net/gallery/..." },
  { key: "twitter", label: "Twitter/X", color: "#7fff7f", placeholder: "https://twitter.com/..." },
  { key: "other", label: "기타", color: "#aaa", placeholder: "https://..." },
];

const STORAGE_KEY = "dui-tracker-v4";

function useMobile() {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth < 600);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 600);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

export default function App() {
  const [records, setRecords] = useState({});
  const [currentDay, setCurrentDay] = useState(1);
  const [view, setView] = useState("today");
  const [loaded, setLoaded] = useState(false);
  const [savedPulse, setSavedPulse] = useState(false);
  const [nagMsg] = useState(() => NAG[Math.floor(Math.random() * NAG.length)]);
  const mob = useMobile();
  const p = mob ? "14px" : "28px";

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from("tracker").select("*");
        if (!error && data && data.length > 0) {
          const rec = {};
          data.forEach(row => {
            rec[row.day] = {
              done: row.done,
              platform: row.platform,
              link: row.link,
              doneAt: row.done_at,
            };
          });
          // currentDay = 완료된 것 중 가장 큰 day + 1
          const doneDays = data.filter(r => r.done).map(r => r.day);
          const nextDay = doneDays.length > 0 ? Math.min(Math.max(...doneDays) + 1, 100) : 1;
          setRecords(rec);
          setCurrentDay(nextDay);
        }
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setSavedPulse(true); setTimeout(() => setSavedPulse(false), 1200);
  }, [records, loaded]);

  const completed = Object.values(records).filter(r => r?.done).length;
  const streak = (() => { let s = 0; for (let i = currentDay - 1; i >= 1; i--) { if (records[i]?.done) s++; else break; } return s; })();

  // 완료 = 업로드 링크 있을 때만
  async function submitUpload(id, platform, link) {
    if (!link.trim()) return;
    const challenge = CHALLENGES[id - 1];
    const doneAt = new Date().toLocaleDateString("ko-KR");
    const updated = { done: true, doneAt, platform, link: link.trim() };
    setRecords(r => ({ ...r, [id]: updated }));
    if (id === currentDay) setCurrentDay(d => Math.min(d + 1, 100));
    await supabase.from("tracker").upsert({
      id,
      day: id,
      title: challenge.title,
      done: true,
      platform,
      link: link.trim(),
      done_at: doneAt,
    });
    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK;
    if (webhookUrl) {
      const platformLabels = { dribbble: "Dribbble", behance: "Behance", twitter: "Twitter/X", other: "기타" };
      const msg = "🎉 **Day " + id + ": " + challenge.title + "** 미션 클리어!\n" + (platformLabels[platform] || platform) + " → " + link.trim();
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg }),
      }).catch(() => {});
    }
  }

  async function undoDone(id) {
    setRecords(r => ({ ...r, [id]: { ...r[id], done: false, link: "", platform: "" } }));
    if (id === currentDay - 1) setCurrentDay(d => Math.max(d - 1, 1));
    await supabase.from("tracker").upsert({
      id,
      day: id,
      done: false,
      platform: "",
      link: "",
      done_at: "",
    });
  }

  if (!loaded) return (
    <div style={{ background: "#080808", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#333", fontFamily: "monospace", letterSpacing: "4px", fontSize: "11px" }}>LOADING...</span>
    </div>
  );

  const today = CHALLENGES[currentDay - 1];

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#e8e8e8", fontFamily: "'Courier New', monospace" }}>
      <header style={{ borderBottom: "1px solid #1a1a1a", padding: mob ? "16px 14px 12px" : "22px 28px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "4px", color: "#333", marginBottom: "3px" }}>DAILY UI CHALLENGE</div>
            <div style={{ fontSize: mob ? "20px" : "24px", fontWeight: "700", letterSpacing: "-0.5px", color: "#fff" }}>Tracker</div>
          </div>
          <div style={{ fontSize: "9px", color: savedPulse ? "#7fff7f" : "#1c1c1c", letterSpacing: "2px", transition: "color 0.5s", paddingTop: "4px" }}>SAVED</div>
        </div>
        <div style={{ display: "flex", marginTop: "14px", borderTop: "1px solid #141414", paddingTop: "12px" }}>
          {[
            { label: "완료", val: `${completed}/100`, color: "#7fff7f" },
            { label: "스트릭", val: `${streak}일`, color: "#ffdd57" },
            { label: "달성률", val: `${completed}%`, color: "#7fb3ff" },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: 1, textAlign: i === 0 ? "left" : i === 2 ? "right" : "center" }}>
              <div style={{ fontSize: mob ? "16px" : "20px", fontWeight: "700", color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: "9px", color: "#333", letterSpacing: "2px", marginTop: "3px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      <div style={{ height: "2px", background: "#111" }}>
        <div style={{ height: "100%", width: `${completed}%`, background: "linear-gradient(90deg,#7fb3ff,#7fff7f)", transition: "width 0.8s cubic-bezier(.16,1,.3,1)" }} />
      </div>

      {streak === 0 && completed < 100 && (
        <div style={{ background: "#0e0900", borderBottom: "1px solid #221c00", padding: `9px ${p}`, fontSize: "11px", color: "#ffdd57" }}>⚡ {nagMsg}</div>
      )}
      {streak >= 3 && (
        <div style={{ background: "#001209", borderBottom: "1px solid #002516", padding: `9px ${p}`, fontSize: "11px", color: "#7fff7f" }}>🔥 {streak}일 연속! 이대로 가자</div>
      )}

      <nav style={{ display: "flex", borderBottom: "1px solid #1a1a1a", padding: `0 ${p}` }}>
        {[["today", "오늘"], ["all", "전체 100"]].map(([v, label]) => (
          <button key={v} onClick={() => setView(v)} style={{
            background: "none", border: "none", padding: mob ? "11px 0" : "13px 0", marginRight: "22px",
            color: view === v ? "#fff" : "#444", cursor: "pointer",
            fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
            borderBottom: view === v ? "1px solid #7fb3ff" : "1px solid transparent",
          }}>{label}</button>
        ))}
      </nav>

      <main style={{ padding: mob ? "16px 14px" : "28px" }}>
        {view === "today"
          ? <TodayPanel mob={mob} challenge={today} record={records[today?.id]}
              onSubmit={(platform, link) => submitUpload(today.id, platform, link)}
              onUndo={() => undoDone(today.id)} />
          : <AllPanel mob={mob} challenges={CHALLENGES} records={records}
              onSubmit={submitUpload} onUndo={undoDone} currentDay={currentDay} />
        }
      </main>
    </div>
  );
}

// ─── 업로드 폼 컴포넌트 ──────────────────────────────────
function UploadForm({ mob, onSubmit, onCancel }) {
  const [platform, setPlatform] = useState("dribbble");
  const [link, setLink] = useState("");
  const selected = UPLOAD_PLATFORMS.find(p => p.key === platform);

  return (
    <div style={{ marginTop: "16px", border: "1px solid #1e1e1e", borderRadius: "3px", padding: "16px", background: "#0a0a0a" }}>
      <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#555", marginBottom: "12px" }}>업로드 링크 등록 — 완료 조건</div>

      {/* 플랫폼 선택 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", marginBottom: "12px" }}>
        {UPLOAD_PLATFORMS.map(p => (
          <button key={p.key} onClick={() => setPlatform(p.key)} style={{
            background: platform === p.key ? `${p.color}14` : "none",
            border: `1px solid ${platform === p.key ? p.color + "66" : "#1e1e1e"}`,
            borderRadius: "2px", padding: "7px 0",
            color: platform === p.key ? p.color : "#444",
            cursor: "pointer", fontSize: "11px", letterSpacing: "1px",
            fontFamily: "monospace",
          }}>{p.label}</button>
        ))}
      </div>

      {/* 링크 입력 */}
      <input
        value={link} onChange={e => setLink(e.target.value)}
        onKeyDown={e => e.key === "Enter" && link.trim() && onSubmit(platform, link)}
        placeholder={selected?.placeholder}
        style={{ width: "100%", boxSizing: "border-box", background: "#111", border: `1px solid ${selected?.color}33`, borderRadius: "2px", padding: "10px 12px", color: "#e8e8e8", fontFamily: "monospace", fontSize: "12px", outline: "none", marginBottom: "10px" }}
      />

      <div style={{ display: "flex", gap: "6px" }}>
        <button onClick={() => link.trim() && onSubmit(platform, link)} style={{
          flex: 1, background: link.trim() ? "#061008" : "#0d0d0d",
          border: `1px solid ${link.trim() ? "#7fff7f55" : "#1e1e1e"}`,
          borderRadius: "2px", color: link.trim() ? "#7fff7f" : "#333",
          cursor: link.trim() ? "pointer" : "default",
          fontSize: "11px", padding: "10px", letterSpacing: "1px", fontFamily: "monospace",
        }}>✓ 업로드 완료 — 미션 클리어</button>
        {onCancel && (
          <button onClick={onCancel} style={{ background: "none", border: "1px solid #1e1e1e", borderRadius: "2px", color: "#333", cursor: "pointer", fontSize: "11px", padding: "10px 14px", fontFamily: "monospace" }}>취소</button>
        )}
      </div>
    </div>
  );
}

// ─── 오늘 패널 ────────────────────────────────────────────
function TodayPanel({ mob, challenge, record, onSubmit, onUndo }) {
  const [showUpload, setShowUpload] = useState(false);
  if (!challenge) return <p style={{ color: "#555" }}>챌린지 완주! 🎉</p>;
  const done = record?.done;
  const platformInfo = UPLOAD_PLATFORMS.find(p => p.key === record?.platform);

  return (
    <div style={{ maxWidth: mob ? "100%" : "560px" }}>
      <div style={{
        border: `1px solid ${done ? "#1d3320" : "#1c1c1c"}`,
        borderRadius: "3px", padding: mob ? "18px" : "24px 28px",
        background: done ? "#060f07" : "#0d0d0d",
        transition: "all 0.4s", marginBottom: "12px",
      }}>
        <div style={{ fontSize: "9px", letterSpacing: "4px", color: "#444", marginBottom: "8px" }}>DAY {challenge.id} / 100</div>
        <h2 style={{ fontSize: mob ? "26px" : "34px", fontWeight: "700", margin: "0 0 14px", letterSpacing: "-1px", lineHeight: 1.1, color: done ? "#7fff7f" : "#fff" }}>
          {challenge.title}
        </h2>

        {/* 미션 설명 */}
        <p style={{ fontSize: mob ? "12px" : "13px", color: "#5a5a5a", lineHeight: "1.75", margin: "0 0 20px", borderLeft: "2px solid #1e1e1e", paddingLeft: "12px" }}>
          {challenge.desc}
        </p>

        <a href="https://www.dailyui.co" target="_blank" rel="noreferrer"
          style={{ fontSize: "10px", color: "#2a2a2a", textDecoration: "none" }}>dailyui.co →</a>

        {/* 완료 상태 */}
        {done ? (
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "11px", color: "#7fff7f", letterSpacing: "1px" }}>✓ 미션 클리어</span>
              {platformInfo && <span style={{ fontSize: "10px", color: platformInfo.color, border: `1px solid ${platformInfo.color}33`, padding: "2px 8px", borderRadius: "2px" }}>{platformInfo.label}</span>}
              <span style={{ fontSize: "10px", color: "#2a2a2a" }}>{record.doneAt}</span>
            </div>
            <a href={record.link} target="_blank" rel="noreferrer"
              style={{ fontSize: "11px", color: "#7fb3ff", textDecoration: "none", wordBreak: "break-all" }}>↗ {record.link}</a>
            <div style={{ marginTop: "12px" }}>
              <button onClick={onUndo} style={{ background: "none", border: "1px solid #1e1e1e", borderRadius: "2px", color: "#333", cursor: "pointer", fontSize: "10px", padding: "5px 12px", fontFamily: "monospace" }}>↩ 취소</button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            {/* 업로드해야 완료 가능 안내 */}
            <div style={{ fontSize: "11px", color: "#444", marginBottom: "12px", letterSpacing: "0.3px" }}>
              📌 Dribbble, Behance, Twitter/X 중 한 곳에 업로드하고 링크 등록하면 완료!
            </div>
            {!showUpload
              ? <button onClick={() => setShowUpload(true)} style={{
                  background: "#061008", border: "1px solid #7fff7f44", borderRadius: "2px",
                  color: "#7fff7f", cursor: "pointer", fontSize: "12px", padding: "10px 20px",
                  letterSpacing: "1px", fontFamily: "monospace",
                  width: mob ? "100%" : "auto",
                }}>업로드 링크 등록하기</button>
              : <UploadForm mob={mob} onSubmit={onSubmit} onCancel={() => setShowUpload(false)} />
            }
          </div>
        )}
      </div>

      {/* 레퍼런스 */}
      <div style={{ border: "1px solid #1a1a1a", borderRadius: "3px", padding: mob ? "14px" : "16px 22px", background: "#0d0d0d" }}>
        <div style={{ fontSize: "9px", letterSpacing: "4px", color: "#333", marginBottom: "10px" }}>REFERENCES — {challenge.title}</div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap: "6px" }}>
          {REFS(challenge.title).map(ref => (
            <a key={ref.label} href={ref.url} target="_blank" rel="noreferrer"
              style={{ display: "block", padding: mob ? "10px 8px" : "7px 14px", border: `1px solid ${ref.color}22`, borderRadius: "2px", color: ref.color, fontSize: mob ? "12px" : "11px", letterSpacing: "0.5px", textDecoration: "none", background: `${ref.color}08`, textAlign: "center" }}>
              ↗ {ref.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 전체 패널 ────────────────────────────────────────────
function AllPanel({ mob, challenges, records, onSubmit, onUndo, currentDay }) {
  const [filter, setFilter] = useState("all");
  const [refOpen, setRefOpen] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(null);

  const filtered = challenges.filter(c => {
    if (filter === "done") return records[c.id]?.done;
    if (filter === "todo") return !records[c.id]?.done;
    return true;
  });

  return (
    <div style={{ maxWidth: mob ? "100%" : "660px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px", marginBottom: "14px" }}>
        {[["all", "전체"], ["todo", "미완료"], ["done", "완료"]].map(([v, label]) => (
          <button key={v} onClick={() => setFilter(v)} style={{
            background: filter === v ? "#181818" : "none",
            border: `1px solid ${filter === v ? "#2a2a2a" : "#141414"}`,
            borderRadius: "2px", padding: mob ? "8px 0" : "5px 0",
            color: filter === v ? "#ccc" : "#3a3a3a", cursor: "pointer",
            fontSize: "10px", letterSpacing: "2px", fontFamily: "monospace",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {filtered.map(c => {
          const rec = records[c.id];
          const done = rec?.done;
          const isCurrent = c.id === currentDay;
          const isRefOpen = refOpen === c.id;
          const isExpanded = expanded === c.id;
          const isUploadOpen = uploadOpen === c.id;
          const platformInfo = UPLOAD_PLATFORMS.find(p => p.key === rec?.platform);

          return (
            <div key={c.id} style={{
              border: `1px solid ${isCurrent ? "#7fb3ff28" : done ? "#1a3020" : "#111"}`,
              borderRadius: "2px",
              background: isCurrent ? "#05080f" : done ? "#050e07" : "#0b0b0b",
            }}>
              <div style={{ padding: mob ? "12px 10px" : "11px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "10px", color: "#2a2a2a", minWidth: "20px", flexShrink: 0 }}>{String(c.id).padStart(2, "0")}</span>

                <span onClick={() => setExpanded(isExpanded ? null : c.id)}
                  style={{ flex: 1, fontSize: mob ? "13px" : "12px", color: done ? "#5dcc6a" : isCurrent ? "#7fb3ff" : "#666", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "pointer" }}>
                  {c.title}
                  {isCurrent && !mob && <span style={{ fontSize: "9px", color: "#7fb3ff66", letterSpacing: "2px", marginLeft: "8px" }}>← TODAY</span>}
                </span>

                {/* 업로드 플랫폼 뱃지 */}
                {done && platformInfo && !mob && (
                  <a href={rec.link} target="_blank" rel="noreferrer"
                    style={{ fontSize: "9px", color: platformInfo.color, border: `1px solid ${platformInfo.color}33`, padding: "2px 6px", borderRadius: "2px", textDecoration: "none", flexShrink: 0 }}>
                    ↗ {platformInfo.label}
                  </a>
                )}

                <button onClick={() => setRefOpen(isRefOpen ? null : c.id)} style={{
                  background: "none", border: "none", color: isRefOpen ? "#ffdd57" : "#252525",
                  cursor: "pointer", fontSize: "9px", letterSpacing: "1px", padding: "0 3px", flexShrink: 0,
                }}>REF</button>

                {!done
                  ? <button onClick={() => setUploadOpen(isUploadOpen ? null : c.id)} style={{
                      background: "none", border: "1px solid #1e1e1e", borderRadius: "2px",
                      color: "#3a3a3a", cursor: "pointer", fontSize: "10px",
                      padding: mob ? "6px 10px" : "3px 9px", letterSpacing: "1px", flexShrink: 0, fontFamily: "monospace",
                    }}>업로드</button>
                  : <button onClick={() => onUndo(c.id)} style={{
                      background: "none", border: "1px solid #1a3020", borderRadius: "2px",
                      color: "#5dcc6a", cursor: "pointer", fontSize: "10px",
                      padding: mob ? "6px 10px" : "3px 9px", flexShrink: 0, fontFamily: "monospace",
                    }}>✓</button>
                }
              </div>

              {/* 설명 펼치기 */}
              {isExpanded && (
                <div style={{ padding: mob ? "0 10px 12px 38px" : "0 14px 12px 44px", borderTop: "1px solid #111" }}>
                  <p style={{ fontSize: "11px", color: "#4a4a4a", lineHeight: "1.7", margin: "10px 0 0", borderLeft: "2px solid #1e1e1e", paddingLeft: "10px" }}>
                    {c.desc}
                  </p>
                </div>
              )}

              {/* REF 드롭다운 */}
              {isRefOpen && (
                <div style={{ padding: mob ? "10px" : "8px 14px 12px 44px", borderTop: "1px solid #111", display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)", gap: "5px" }}>
                  {REFS(c.title).map(ref => (
                    <a key={ref.label} href={ref.url} target="_blank" rel="noreferrer"
                      style={{ fontSize: "10px", color: ref.color, textDecoration: "none", padding: "6px 0", border: `1px solid ${ref.color}22`, borderRadius: "2px", background: `${ref.color}08`, textAlign: "center" }}>
                      ↗ {ref.label}
                    </a>
                  ))}
                </div>
              )}

              {/* 업로드 폼 */}
              {isUploadOpen && !done && (
                <div style={{ padding: "0 10px 12px", borderTop: "1px solid #111" }}>
                  <UploadForm mob={mob}
                    onSubmit={(platform, link) => { onSubmit(c.id, platform, link); setUploadOpen(null); }}
                    onCancel={() => setUploadOpen(null)} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "10px", fontSize: "10px", color: "#252525" }}>💡 제목 클릭 → 미션 설명 / 업로드 버튼 → 완료 처리</div>
    </div>
  );
}