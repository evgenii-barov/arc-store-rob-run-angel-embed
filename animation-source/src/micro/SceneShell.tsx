import type {ReactNode} from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SceneShell: React.FC<{
  children: ReactNode;
  accent?: "left" | "right" | "full";
}> = ({children, accent = "left"}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const scale = width / 360;
  const drift = interpolate(frame, [0, 60], [-4, 5], {
    extrapolateRight: "extend",
  });
  const accentBackground =
    accent === "full"
      ? "linear-gradient(105deg,rgba(194,233,123,.2),transparent 62%)"
      : accent === "right"
        ? "linear-gradient(90deg,transparent 42%,rgba(194,233,123,.18))"
        : "linear-gradient(90deg,rgba(194,233,123,.18),transparent 58%)";

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: "#070906",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <Img
        src={staticFile("assets/rob-run-cash.webp")}
        style={{
          position: "absolute",
          inset: -8 * scale,
          width: `calc(100% + ${16 * scale}px)`,
          height: `calc(100% + ${16 * scale}px)`,
          objectFit: "cover",
          objectPosition: "50% 46%",
          opacity: 0.22,
          transform: `translateX(${drift * scale}px) scale(1.08)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg,rgba(4,6,4,.98),rgba(7,9,6,.86) 58%,rgba(3,5,3,.96))",
        }}
      />
      <AbsoluteFill style={{background: accentBackground}} />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4 * scale,
          background: "#c2e97b",
          boxShadow: `0 0 ${18 * scale}px rgba(194,233,123,.72)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(118deg,transparent 0 54px,rgba(194,233,123,.055) 55px 57px,transparent 58px 110px)",
          transform: `translateX(${drift * 1.8 * scale}px)`,
        }}
      />
      {children}
      <div
        style={{
          position: "absolute",
          left: 14 * scale,
          right: 14 * scale,
          bottom: 0,
          height: 2 * scale,
          background:
            "linear-gradient(90deg,transparent,#c2e97b 22%,#efffd0 50%,#c2e97b 78%,transparent)",
          boxShadow: `0 0 ${9 * scale}px rgba(194,233,123,.6)`,
        }}
      />
    </AbsoluteFill>
  );
};
