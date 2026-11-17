import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {SceneShell} from "./SceneShell";

export const CartCtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const scale = width / 360;
  const cartHit = spring({
    frame,
    fps,
    config: {damping: 7, mass: 0.5, stiffness: 210},
    durationInFrames: 22,
  });
  const arrowShift = interpolate(frame % 18, [0, 9, 17], [0, 5, 0]);

  return (
    <SceneShell accent="left">
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `${62 * scale}px ${2 * scale}px 1fr`,
          alignItems: "center",
          columnGap: 12 * scale,
          padding: `0 ${19 * scale}px 0 ${18 * scale}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${0.62 + cartHit * 0.38}) rotate(${(1 - cartHit) * -7}deg)`,
            filter: `drop-shadow(0 0 ${10 * scale}px rgba(194,233,123,.28))`,
          }}
        >
          <Img
            src={staticFile("assets/arc-store-cart.webp")}
            style={{
              width: 58 * scale,
              maxHeight: 49 * scale,
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            height: 49 * scale,
            background:
              "linear-gradient(transparent,rgba(194,233,123,.8),transparent)",
          }}
        />
        <div
          style={{
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6 * scale,
          }}
        >
          <div>
            <div
              style={{
                color: "#c2e97b",
                fontSize: 10 * scale,
                fontWeight: 800,
                letterSpacing: "0.13em",
                lineHeight: 1,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Получить скидку
            </div>
            <div
              style={{
                marginTop: 5 * scale,
                fontSize: 20 * scale,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 0.92,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Жми баннер
              <br />
              под стримом
            </div>
          </div>
          <div
            style={{
              color: "#c2e97b",
              fontSize: 28 * scale,
              fontWeight: 800,
              lineHeight: 1,
              transform: `translateX(${arrowShift * scale}px)`,
              textShadow: `0 0 ${10 * scale}px rgba(194,233,123,.7)`,
            }}
          >
            ›
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

