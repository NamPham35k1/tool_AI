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

export const Scene3Merge: React.FC = () => {
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

  // Merge commit node pop spring
  const mergeNodeScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/GitRebaseVsMerge/scene3_merge.mp3")} />

      {/* Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border border-sky-400/40 bg-sky-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl">🔀</span>
        <span className="text-3xl font-black tracking-widest text-sky-300 uppercase">
          PHƯƠNG ÁN 1: GIT MERGE
        </span>
      </div>

      {/* Center Card */}
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
        }}
        className="mt-10 flex w-full max-w-[900px] flex-col items-center gap-6 rounded-3xl border-2 border-sky-400/30 bg-slate-950/85 p-8 shadow-[0_20px_60px_rgba(56,189,248,0.25)] backdrop-blur-2xl"
      >
        <div className="text-center">
          <h2 className="text-5xl font-black tracking-tight text-sky-300">
            Tạo Commit Gộp (Merge Commit)
          </h2>
          <p className="mt-2 text-2xl text-slate-300">
            Giữ nguyên lịch sử phân nhánh gốc của cả hai bên
          </p>
        </div>

        {/* Visual Graph Diagram */}
        <div className="relative flex w-full flex-col items-center justify-center rounded-2xl bg-black/60 p-6 border border-white/10">
          <svg viewBox="0 0 700 180" className="w-full h-44" fill="none">
            {/* Main line */}
            <line x1="80" y1="50" x2="600" y2="50" stroke="#38BDF8" strokeWidth="4" />
            {/* Feature branch line */}
            <path d="M 200 50 Q 240 130 300 130 L 440 130 Q 500 130 540 50" stroke="#818CF8" strokeWidth="4" strokeDasharray="6 6" />

            {/* Commits on main */}
            <circle cx="100" cy="50" r="14" fill="#0284C7" stroke="#FFF" strokeWidth="3" />
            <text x="100" y="55" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">C1</text>

            <circle cx="200" cy="50" r="14" fill="#0284C7" stroke="#FFF" strokeWidth="3" />
            <text x="200" y="55" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">C2</text>

            {/* Commits on feature branch */}
            <circle cx="340" cy="130" r="14" fill="#6366F1" stroke="#FFF" strokeWidth="3" />
            <text x="340" y="135" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">C3</text>

            <circle cx="440" cy="130" r="14" fill="#6366F1" stroke="#FFF" strokeWidth="3" />
            <text x="440" y="135" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">C4</text>

            {/* Newly Created Merge Commit Node */}
            <g style={{ transform: `scale(${mergeNodeScale})`, transformOrigin: "540px 50px" }}>
              <polygon points="540,25 565,50 540,75 515,50" fill="#F59E0B" stroke="#FFF" strokeWidth="4" />
              <text x="540" y="56" fill="#000" fontSize="14" fontWeight="900" textAnchor="middle">M</text>
            </g>

            {/* Labels */}
            <text x="40" y="55" fill="#38BDF8" fontSize="16" fontWeight="bold">main</text>
            <text x="40" y="135" fill="#818CF8" fontSize="16" fontWeight="bold">feature</text>
            <text x="540" y="105" fill="#F59E0B" fontSize="16" fontWeight="bold" textAnchor="middle">Merge Commit</text>
          </svg>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="rounded-2xl border border-sky-500/30 bg-sky-950/40 p-4">
            <p className="text-2xl font-bold text-sky-200">
              ✅ An toàn, không sửa đổi lịch sử
            </p>
            <p className="text-lg text-slate-400 mt-1">
              Tuyệt đối an toàn khi làm việc nhóm
            </p>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/40 p-4">
            <p className="text-2xl font-bold text-amber-200">
              ⚠️ Cây commit bị phân nhánh
            </p>
            <p className="text-lg text-slate-400 mt-1">
              Nhiều commit gộp gây rối mắt
            </p>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line */}
      <SubtitleBox
        text="Git Merge kết hợp hai nhánh và tạo ra một commit gộp mới. An toàn, giữ nguyên lịch sử nhưng cây commit rất cồng kềnh."
        durationInFrames={233}
        highlightKeyword="Merge"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
