import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {SceneShell} from "./SceneShell";

export const CashQuestionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const scale = width / 360;
  const hit = spring({
    frame,
    fps,
    config: {damping: 9, mass: 0.55, stiffness: 190},
    durationInFrames: 22,
  });
  const glow = interpolate(frame % 24, [0, 12, 23], [0.18, 0.55, 0.18]);

  return (
    <SceneShell accent="full">
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: `0 ${19 * scale}px 0 ${23 * scale}px`,
          gap: 12 * scale,
        }}
      >
        <div style={{flex: 1, minWidth: 0}}>
          <div
            style={{
              color: "#c2e97b",
              fontSize: 18 * scale,
              fontWeight: 800,
              letterSpacing: "0.08em",
              lineHeight: 0.88,
              textTransform: "uppercase",
            }}
          >
            Нужны
          </div>
          <div
            style={{
              marginTop: 5 * scale,
              fontSize: 29 * scale,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 0.86,
              textTransform: "uppercase",
              textShadow: `0 0 ${14 * scale}px rgba(255,255,255,.12)`,
              transform: `scale(${0.92 + hit * 0.08})`,
              transformOrigin: "left center",
              whiteSpace: "nowrap",
            }}
          >
            Наличные?
          </div>
        </div>
        <div
          style={{
            width: 48 * scale,
            height: 48 * scale,
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8 * scale,
            background: "#c2e97b",
            color: "#070906",
            fontSize: 31 * scale,
            fontWeight: 800,
            lineHeight: 1,
            transform: `rotate(${-7 + hit * 7}deg) scale(${0.82 + hit * 0.18})`,
            boxShadow: `0 0 ${22 * scale}px rgba(194,233,123,${glow})`,
          }}
        >
          ₽
        </div>
      </div>
    </SceneShell>
  );
};

