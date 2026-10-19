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

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge spring
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Card slide up spring
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

  // Warning pulse
  const pulse = Math.sin(frame / 6) * 0.08 + 1;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/GitRebaseVsMerge/scene2_problem.mp3")} />

      {/* Warning Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border border-red-500/40 bg-red-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl">⚠️</span>
        <span className="text-3xl font-black tracking-widest text-red-300 uppercase">
          VẤN ĐỀ THỰC TẾ
        </span>
      </div>

      {/* Center Card - Spaghetti Git Log */}
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
        }}
        className="mt-10 flex w-full max-w-[880px] flex-col items-center gap-6 rounded-3xl border-2 border-red-500/30 bg-slate-950/85 p-8 shadow-[0_20px_60px_rgba(239,68,68,0.25)] backdrop-blur-2xl"
      >
        {/* Title */}
        <div className="flex items-center gap-4">
          <div
            style={{ transform: `scale(${pulse})` }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/30 text-3xl font-black text-red-400 border border-red-500/50"
          >
            💥
          </div>
          <h2 className="text-5xl font-black text-slate-100 tracking-tight">
            Lịch Sử Git Bị "Bòng Bong"
          </h2>
        </div>

        {/* Tangled Git Commits Mockup */}
        <div className="flex w-full flex-col gap-3.5 rounded-2xl bg-black/60 p-6 border border-white/10 font-mono text-2xl">
          <div className="flex items-center gap-3 text-red-400">
            <span className="h-4 w-4 rounded-full bg-red-500" />
            <span className="text-slate-400">c8a1e2f</span>
            <span className="font-bold">Merge branch 'feat/auth' into main</span>
          </div>
          <div className="flex items-center gap-3 text-amber-400 pl-6 border-l-2 border-red-500/40">
            <span className="h-3.5 w-3.5 rounded-full bg-amber-500" />
            <span className="text-slate-400">f94b01d</span>
            <span>fix conflict with dev</span>
          </div>
          <div className="flex items-center gap-3 text-red-400">
            <span className="h-4 w-4 rounded-full bg-red-500" />
            <span className="text-slate-400">71d3a90</span>
            <span className="font-bold">Merge branch 'fix/ui' into main</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 pl-6 border-l-2 border-dashed border-red-500/40">
            <span className="h-3.5 w-3.5 rounded-full bg-slate-500" />
            <span>d5e72a8</span>
            <span>WIP: another merge commit...</span>
          </div>
        </div>

        {/* Impact callouts */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex items-center gap-3 rounded-2xl bg-red-950/40 border border-red-500/30 p-4">
            <span className="text-3xl">❌</span>
            <p className="text-2xl font-bold text-red-200">
              Khó tra cứu lỗi khi xảy ra Bug
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-red-950/40 border border-red-500/30 p-4">
            <span className="text-3xl">❌</span>
            <p className="text-2xl font-bold text-red-200">
              Cực kỳ khó dùng Git Bisect
            </p>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line */}
      <SubtitleBox
        text="Dùng sai cách có thể biến lịch sử commit của dự án thành một mớ bòng bong rối rắm khó gỡ."
        durationInFrames={165}
        highlightKeyword="commit"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
