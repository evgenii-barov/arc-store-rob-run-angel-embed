import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {SceneShell} from "./SceneShell";

export const OfferScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const scale = width / 360;
  const punch = spring({
    frame,
    fps,
    config: {damping: 8, mass: 0.45, stiffness: 230},
    durationInFrames: 20,
  });
  const stripe = interpolate(frame, [0, 42], [-95, 390], {
    extrapolateRight: "extend",
  });

  return (
    <SceneShell accent="right">
      <div
        style={{
          position: "absolute",
          top: -30 * scale,
          left: stripe * scale,
          width: 52 * scale,
          height: 150 * scale,
          transform: "rotate(14deg)",
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12 * scale,
          padding: `0 ${21 * scale}px 0 ${24 * scale}px`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12 * scale,
              fontWeight: 800,
              letterSpacing: "0.1em",
              lineHeight: 1,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Офиц. партнёр ARC Store
          </div>
          <div
            style={{
              marginTop: 7 * scale,
              color: "#c2e97b",
              fontSize: 31 * scale,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.84,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              textShadow: `0 0 ${16 * scale}px rgba(194,233,123,.28)`,
              transform: `scale(${0.9 + punch * 0.1})`,
              transformOrigin: "left center",
            }}
          >
            Скидка 10%
          </div>
        </div>
        <div
          style={{
            width: 8 * scale,
            height: 54 * scale,
            flex: "0 0 auto",
            borderRadius: 4 * scale,
            backgroundColor: "#c2e97b",
            transform: `scaleY(${0.55 + punch * 0.45})`,
            boxShadow: `0 0 ${17 * scale}px rgba(194,233,123,.58)`,
          }}
        />
      </div>
    </SceneShell>
  );
};
