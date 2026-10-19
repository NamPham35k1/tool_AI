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

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardScale = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const heartPulse = Math.sin(frame / 6) * 0.12 + 1;

  const opacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/GitRebaseVsMerge/scene6_outro.mp3")} />

      {/* Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border border-sky-400/40 bg-sky-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl">🚀</span>
        <span className="text-3xl font-black tracking-widest text-sky-300 uppercase">
          NÂNG TẦM KỸ NĂNG DEV
        </span>
      </div>

      {/* Main CTA Card */}
      <div
        style={{
          transform: `scale(${cardScale})`,
          opacity,
        }}
        className="mt-10 flex w-full max-w-[880px] flex-col items-center gap-6 rounded-3xl border-2 border-sky-400/40 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-black p-10 text-center shadow-[0_20px_70px_rgba(56,189,248,0.3)] backdrop-blur-2xl"
      >
        {/* Heart / Channel icon */}
        <div
          style={{ transform: `scale(${heartPulse})` }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 text-5xl shadow-[0_0_30px_rgba(244,63,94,0.5)]"
        >
          ❤️
        </div>

        <div>
          <h2 className="text-6xl font-black tracking-tight text-white">
            Code Chuẩn • Git Sạch
          </h2>
          <p className="mt-3 text-3xl font-bold text-sky-300">
            Tự tin phối hợp trong mọi dự án lớn!
          </p>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-3 rounded-full bg-rose-500/20 border border-rose-500/40 px-8 py-3.5 text-2xl font-black text-rose-300">
            <span>👍</span> Thả Tim
          </div>
          <div className="flex items-center gap-3 rounded-full bg-sky-500/20 border border-sky-500/40 px-8 py-3.5 text-2xl font-black text-sky-300">
            <span>🔔</span> Follow Kênh
          </div>
        </div>
      </div>

      {/* Subtitle 1 line */}
      <SubtitleBox
        text="Hiểu rõ hai lệnh này sẽ giúp bạn làm việc nhóm chuyên nghiệp hơn. Đừng quên thả tim và follow kênh nhé!"
        durationInFrames={206}
        highlightKeyword="follow"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
