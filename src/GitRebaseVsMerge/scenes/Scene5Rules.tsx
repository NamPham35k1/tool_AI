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

export const Scene5Rules: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const card1Spring = spring({
    frame: frame - 6,
    fps,
    from: 60,
    to: 0,
    config: { damping: 14, stiffness: 90 },
  });

  const card2Spring = spring({
    frame: frame - 16,
    fps,
    from: 60,
    to: 0,
    config: { damping: 14, stiffness: 90 },
  });

  const opacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/GitRebaseVsMerge/scene5_rules.mp3")} />

      {/* Top Badge */}
      <div
        style={{ transform: `scale(${badgeScale})` }}
        className="flex items-center gap-3 rounded-full border border-amber-400/40 bg-amber-500/15 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="text-3xl">🏆</span>
        <span className="text-3xl font-black tracking-widest text-amber-300 uppercase">
          QUY TẮC VÀNG THỰC CHIẾN
        </span>
      </div>

      {/* 2 Rule Cards */}
      <div
        style={{ opacity }}
        className="mt-10 flex w-full max-w-[900px] flex-col gap-6"
      >
        {/* Card 1: Rebase */}
        <div
          style={{ transform: `translateY(${card1Spring}px)` }}
          className="flex items-center justify-between rounded-3xl border-2 border-emerald-400/50 bg-gradient-to-r from-emerald-950/70 to-slate-950/90 p-7 shadow-[0_15px_40px_rgba(16,185,129,0.25)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/20 text-4xl border border-emerald-400/40">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-4xl font-black text-emerald-300">
                  DÙNG GIT REBASE
                </h3>
                <span className="rounded-full bg-emerald-500/30 px-4 py-1 text-xl font-extrabold text-emerald-200">
                  Nhánh Cá Nhân
                </span>
              </div>
              <p className="mt-1.5 text-2xl text-slate-200">
                Làm sạch commit trên <span className="font-bold text-amber-300">feature branch</span> trước khi tạo Pull Request.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Merge */}
        <div
          style={{ transform: `translateY(${card2Spring}px)` }}
          className="flex items-center justify-between rounded-3xl border-2 border-sky-400/50 bg-gradient-to-r from-sky-950/70 to-slate-950/90 p-7 shadow-[0_15px_40px_rgba(56,189,248,0.25)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-500/20 text-4xl border border-sky-400/40">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-4xl font-black text-sky-300">
                  DÙNG GIT MERGE
                </h3>
                <span className="rounded-full bg-sky-500/30 px-4 py-1 text-xl font-extrabold text-sky-200">
                  Nhánh Chung
                </span>
              </div>
              <p className="mt-1.5 text-2xl text-slate-200">
                Hợp nhất code vào <span className="font-bold text-sky-300">main</span> hoặc <span className="font-bold text-sky-300">develop</span> để bảo toàn lịch sử.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle 1 line */}
      <SubtitleBox
        text="Quy tắc vàng: Dùng Rebase cho nhánh cá nhân trước khi tạo PR, và dùng Merge cho các nhánh chung như Main hay Develop."
        durationInFrames={211}
        highlightKeyword="PR"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
