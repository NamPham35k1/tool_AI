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

interface Scene1HookProps {
  title?: string;
  subtitle?: string;
}

export const Scene1Hook: React.FC<Scene1HookProps> = ({
  title = "Git Rebase vs Merge",
  subtitle = "Khác nhau thế nào & khi nào nên dùng?",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge spring
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Title spring
  const titleY = spring({
    frame: frame - 6,
    fps,
    from: 60,
    to: 0,
    config: { damping: 14, stiffness: 90 },
  });
  const titleOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center Git Branch Graphic spring
  const iconScale = spring({
    frame: frame - 12,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const floatOffset = Math.sin(frame / 12) * 12;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-10 text-white">
      <Audio src={staticFile("audio/GitRebaseVsMerge/scene1_hook.mp3")} />

      {/* Top Badge */}
      <div
        style={{
          transform: `scale(${badgeScale})`,
        }}
        className="flex items-center gap-3 rounded-full border border-orange-400/40 bg-orange-500/10 px-8 py-3.5 backdrop-blur-md"
      >
        <span className="h-4 w-4 animate-ping rounded-full bg-orange-400" />
        <span className="text-3xl font-black tracking-widest text-orange-300 uppercase">
          GIT &amp; VERSION CONTROL
        </span>
      </div>

      {/* Center Visuals */}
      <div className="mt-10 flex flex-col items-center gap-6">
        {/* Floating Git Branch Graphic */}
        <div
          style={{
            transform: `scale(${iconScale}) translateY(${floatOffset}px)`,
          }}
          className="relative flex h-52 w-52 items-center justify-center rounded-3xl border-2 border-orange-400/40 bg-gradient-to-br from-orange-500/25 via-red-600/15 to-transparent p-6 shadow-[0_0_90px_rgba(249,115,22,0.45)] backdrop-blur-xl"
        >
          {/* Custom SVG Git Branch Icon */}
          <svg viewBox="0 0 100 100" className="h-36 w-36 drop-shadow-lg" fill="none">
            {/* Main trunk line */}
            <line x1="30" y1="20" x2="30" y2="80" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
            {/* Branch curve */}
            <path d="M30 60 C30 45, 70 45, 70 35 L70 20" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Nodes */}
            <circle cx="30" cy="25" r="9" fill="#F97316" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="30" cy="75" r="9" fill="#F97316" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="70" cy="25" r="9" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" />
          </svg>
        </div>

        {/* Main Hook Titles */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
          className="text-center"
        >
          <h1 className="text-8xl font-black tracking-tight leading-tight">
            {title === "Git Rebase vs Merge" ? (
              <>
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  GIT REBASE
                </span>
                <span className="text-white text-6xl mx-4">vs</span>
                <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  MERGE
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                {title}
              </span>
            )}
          </h1>
          <p className="mt-4 text-4xl font-bold text-slate-200">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Subtitle 1 line */}
      <SubtitleBox
        text="Bạn phân vân khi nào nên dùng Git Merge và khi nào nên dùng Git Rebase?"
        durationInFrames={139}
        highlightKeyword="Git"
        className="mt-64"
      />
    </AbsoluteFill>
  );
};
