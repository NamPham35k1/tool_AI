import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SubtitleBox } from "../components/SubtitleBox";

export const Scene4Rebase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardY = spring({
    frame: frame - 6,
    fps,
    from: 80,
    to: 0,
    config: { damping: 14, stiffness: 85 },
  });

  const cardOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rebase transition: commits moving up
  const liftProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const rebaseY = interpolate(liftProgress, [0, 1], [130, 50]);

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/GitRebaseVsMerge/scene4_rebase.mp3")} />

      {/* Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl">✨</span>
        <span className="text-3xl font-black tracking-widest text-emerald-300 uppercase">
          PHƯƠNG ÁN 2: GIT REBASE
        </span>
      </div>

      {/* Center Card */}
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
        }}
        className="mt-10 flex w-full max-w-[900px] flex-col items-center gap-6 rounded-3xl border-2 border-emerald-400/30 bg-slate-950/85 p-8 shadow-[0_20px_60px_rgba(16,185,129,0.25)] backdrop-blur-2xl"
      >
        <div className="text-center">
          <h2 className="text-5xl font-black tracking-tight text-emerald-300">
            Tái Lập Lịch Sử Thẳng Tắp
          </h2>
          <p className="mt-2 text-2xl text-slate-300">
            Nhấc các commit nhánh con dán tiếp nối vào ngọn của nhánh chính
          </p>
        </div>

        {/* Visual Graph Diagram */}
        <div className="relative flex w-full flex-col items-center justify-center rounded-2xl bg-black/60 p-6 border border-white/10">
          <svg viewBox="0 0 700 180" className="w-full h-44" fill="none">
            {/* Main line */}
            <line x1="80" y1="50" x2="620" y2="50" stroke="#10B981" strokeWidth="5" />

            {/* Commits on main */}
            <circle cx="120" cy="50" r="16" fill="#059669" stroke="#FFF" strokeWidth="3" />
            <text x="120" y="56" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle">C1</text>

            <circle cx="240" cy="50" r="16" fill="#059669" stroke="#FFF" strokeWidth="3" />
            <text x="240" y="56" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle">C2</text>

            {/* Rebased Commits moving into single line */}
            <g style={{ transform: `translateY(${rebaseY - 130}px)` }}>
              {/* C3' */}
              <circle cx="380" cy="130" r="16" fill="#F59E0B" stroke="#FFF" strokeWidth="3" />
              <text x="380" y="136" fill="#000" fontSize="13" fontWeight="900" textAnchor="middle">C3'</text>

              {/* C4' */}
              <circle cx="500" cy="130" r="16" fill="#F59E0B" stroke="#FFF" strokeWidth="3" />
              <text x="500" y="136" fill="#000" fontSize="13" fontWeight="900" textAnchor="middle">C4'</text>
            </g>

            {/* Labels */}
            <text x="30" y="56" fill="#10B981" fontSize="16" fontWeight="bold">main</text>
            <text x="440" y="115" fill="#F59E0B" fontSize="16" fontWeight="bold" textAnchor="middle">
              {rebaseY < 80 ? "⭐ 1 Đường Thẳng Duy Nhất!" : "Đang nhấc commit lên..."}
            </text>
          </svg>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4">
            <p className="text-2xl font-bold text-emerald-200">
              ✅ Git log siêu sạch sẽ
            </p>
            <p className="text-lg text-slate-400 mt-1">
              Thẳng hàng 1 đường, dễ đọc code
            </p>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/40 p-4">
            <p className="text-2xl font-bold text-amber-200">
              ⚠️ Viết lại lịch sử (Rewrite)
            </p>
            <p className="text-lg text-slate-400 mt-1">
              Không dùng trên nhánh công khai
            </p>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line */}
      <SubtitleBox
        text="Trong khi đó, Git Rebase nhấc toàn bộ commit của bạn đặt lên ngọn nhánh chính, tạo ra một đường thẳng tắp cực kỳ sạch sẽ."
        durationInFrames={207}
        highlightKeyword="Rebase"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
