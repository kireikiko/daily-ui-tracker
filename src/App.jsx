import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [view, setView] = useState("today");

  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        color: "#333333",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          borderBottom: "1px solid #F0F0F0",
          padding: "22px 28px 16px",
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "4px",
                color: "#AAAAAA",
                marginBottom: "3px",
              }}
            >
              DAILY UI CHALLENGE
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
                color: "#111111",
              }}
            >
              Tracker
            </div>
          </div>

          <div
            style={{
              fontSize: "9px",
              color: "#CCCCCC",
              letterSpacing: "2px",
              paddingTop: "4px",
            }}
          >
            SAVED
          </div>
        </div>

        {/* STATUS */}
        <div
          style={{
            display: "flex",
            marginTop: "14px",
            borderTop: "1px solid #F5F5F5",
            paddingTop: "12px",
          }}
        >
          {[
            { label: "완료", val: `6/100`, color: "#0ACF83" },
            { label: "스트릭", val: `4일`, color: "#FF7262" },
            { label: "달성률", val: `6%`, color: "#1ABCFE" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                textAlign:
                  i === 0 ? "left" : i === 2 ? "right" : "center",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.val}
              </div>

              <div
                style={{
                  fontSize: "9px",
                  color: "#AAAAAA",
                  letterSpacing: "2px",
                  marginTop: "3px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* PROGRESS */}
      <div style={{ height: "2px", background: "#F3F3F3" }}>
        <div
          style={{
            height: "100%",
            width: "6%",
            background:
              "linear-gradient(90deg,#1ABCFE,#0ACF83)",
          }}
        />
      </div>

      {/* STREAK */}
      <div
        style={{
          background: "#F4FFF9",
          borderBottom: "1px solid #DDF7EA",
          padding: "9px 28px",
          fontSize: "11px",
          color: "#0ACF83",
        }}
      >
        🔥 4일 연속! 이대로 가자
      </div>

      {/* NAV */}
      <nav
        style={{
          display: "flex",
          borderBottom: "1px solid #F0F0F0",
          padding: "0 28px",
          background: "#FFFFFF",
        }}
      >
        {[
          ["today", "오늘"],
          ["all", "전체 100"],
        ].map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              background: "none",
              border: "none",
              padding: "13px 0",
              marginRight: "22px",
              color:
                view === v ? "#111111" : "#AAAAAA",
              cursor: "pointer",
              fontSize: "11px",
              letterSpacing: "2px",
              borderBottom:
                view === v
                  ? "1px solid #BBDFFF"
                  : "1px solid transparent",
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* MAIN */}
      <main style={{ padding: "28px" }}>
        {/* CARD */}
        <div
          style={{
            maxWidth: "560px",
            border: "1px solid #EAEAEA",
            borderRadius: "4px",
            padding: "24px 28px",
            background: "#FAFAFA",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "4px",
              color: "#888888",
              marginBottom: "8px",
            }}
          >
            DAY 49 / 100
          </div>

          <h2
            style={{
              fontSize: "34px",
              fontWeight: "700",
              margin: "0 0 14px",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              color: "#111111",
            }}
          >
            Notifications
          </h2>

          <p
            style={{
              fontSize: "13px",
              color: "#666666",
              lineHeight: "1.75",
              margin: "0 0 20px",
              borderLeft: "2px solid #E5E5E5",
              paddingLeft: "12px",
            }}
          >
            알림을 디자인해. 앱? 이메일? 어떤 종류의 알림?
            우선순위는 어떻게 표시해?
          </p>

          <a
            href="#"
            style={{
              fontSize: "10px",
              color: "#BBBBBB",
              textDecoration: "none",
            }}
          >
            dailyui.co →
          </a>

          {/* ACTION */}
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#555555",
                marginBottom: "12px",
              }}
            >
              📌 Dribbble, Behance, Twitter/X 중 한 곳에 업로드하고
              링크 등록하면 완료!
            </div>

            <button
              style={{
                background: "#E9FFF5",
                border: "1px solid #CFF5E2",
                borderRadius: "2px",
                color: "#0ACF83",
                cursor: "pointer",
                fontSize: "12px",
                padding: "10px 20px",
                letterSpacing: "1px",
              }}
            >
              업로드 링크 등록하기
            </button>
          </div>
        </div>

        {/* REFERENCES */}
        <div
          style={{
            maxWidth: "560px",
            border: "1px solid #EAEAEA",
            borderRadius: "4px",
            padding: "16px 22px",
            background: "#FAFAFA",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "4px",
              color: "#AAAAAA",
              marginBottom: "10px",
            }}
          >
            REFERENCES — Notifications
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "6px",
            }}
          >
            {[
              ["Mobbin", "#0ACF83"],
              ["Dribbble", "#FF7262"],
              ["Behance", "#1ABCFE"],
              ["Pinterest", "#F24E1E"],
            ].map(([label, color]) => (
              <a
                key={label}
                href="#"
                style={{
                  display: "block",
                  padding: "7px 14px",
                  border: `1px solid ${color}22`,
                  borderRadius: "2px",
                  color,
                  fontSize: "11px",
                  textDecoration: "none",
                  background: `${color}08`,
                  textAlign: "center",
                }}
              >
                ↗ {label}
              </a>
            ))}
          </div>
        </div>

        {/* LIST */}
        <div
          style={{
            marginTop: "28px",
            maxWidth: "660px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {[
            "Sign Up",
            "Credit Card Checkout",
            "Landing Page",
            "Calculator",
            "App Icon",
          ].map((item, idx) => (
            <div
              key={item}
              style={{
                border: "1px solid #EAEAEA",
                borderRadius: "3px",
                background: "#FAFAFA",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  color: "#BBBBBB",
                  marginRight: "14px",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              <span
                style={{
                  flex: 1,
                  fontSize: "13px",
                  color: "#444444",
                }}
              >
                {item}
              </span>

              <button
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #EAEAEA",
                  borderRadius: "2px",
                  color: "#888888",
                  cursor: "pointer",
                  fontSize: "10px",
                  padding: "5px 10px",
                }}
              >
                업로드
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}