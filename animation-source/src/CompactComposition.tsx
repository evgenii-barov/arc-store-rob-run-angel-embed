import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const getMessageMotion = (
  frame: number,
  center: number,
  durationInFrames: number,
) => {
  const segment = durationInFrames / 3;
  const wrapped =
    ((frame - center + durationInFrames / 2) % durationInFrames) -
    durationInFrames / 2;
  const distance = Math.abs(wrapped);

  return {
    opacity: interpolate(
      distance,
      [segment * 0.25, segment * 0.75],
      [1, 0],
      {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
    ),
    translateY: interpolate(
      wrapped,
      [-segment * 0.75, 0, segment * 0.75],
      [10, 0, -10],
      {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
    ),
  };
};

export const CompactObsBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const scale = width / 720;
  const phase = (frame / durationInFrames) * Math.PI * 2;
  const segment = durationInFrames / 3;
  const partner = getMessageMotion(frame, 0, durationInFrames);
  const offer = getMessageMotion(frame, segment, durationInFrames);
  const destination = getMessageMotion(frame, segment * 2, durationInFrames);
  const sweepX = interpolate(
    frame,
    [0, durationInFrames - 1],
    [-width * 0.18, width * 1.12],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: width - 4 * scale,
          height: 84 * scale,
          overflow: "hidden",
          clipPath:
            "polygon(0 22%, 3% 0, 97% 0, 100% 22%, 100% 78%, 97% 100%, 3% 100%, 0 78%)",
          backgroundColor: "#080a07",
          boxShadow: `0 0 ${18 * scale}px rgba(194,233,123,.22)`,
        }}
      >
        <Img
          src={staticFile("assets/rob-run-cash.webp")}
          style={{
            position: "absolute",
            inset: -8 * scale,
            width: width + 12 * scale,
            height: 100 * scale,
            objectFit: "cover",
            objectPosition: "50% 46%",
            opacity: 0.5,
            scale: 1.06 + Math.sin(phase) * 0.01,
            translate: `${Math.sin(phase) * 5 * scale}px ${Math.cos(phase) * 1.5 * scale}px`,
          }}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(90deg,rgba(4,6,4,.98),rgba(8,11,7,.9) 42%,rgba(5,7,4,.82) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -18 * scale,
            left: sweepX,
            width: 90 * scale,
            height: 120 * scale,
            rotate: "12deg",
            background:
              "linear-gradient(90deg,transparent,rgba(194,233,123,.18),rgba(255,255,255,.1),transparent)",
            filter: `blur(${7 * scale}px)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            padding: `0 ${22 * scale}px`,
            gap: 18 * scale,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              gap: 8 * scale,
              translate: `0px ${Math.sin(phase) * 1.2 * scale}px`,
            }}
          >
            <Img
              src={staticFile("assets/arc-store-cart.webp")}
              style={{
                width: 38 * scale,
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 2px 4px #000)",
              }}
            />
            <Img
              src={staticFile("assets/arc-store-wordmark.png")}
              style={{width: 72 * scale, height: "auto", objectFit: "contain"}}
            />
            <span
              style={{
                color: "#9aa09d",
                fontSize: 15 * scale,
                fontWeight: 800,
              }}
            >
              ×
            </span>
            <Img
              src={staticFile("assets/rob-run-logo.png")}
              style={{width: 112 * scale, height: "auto", objectFit: "contain"}}
            />
          </div>

          <div
            style={{
              width: 1 * scale,
              height: 44 * scale,
              flexShrink: 0,
              background:
                "linear-gradient(transparent,rgba(194,233,123,.65),transparent)",
            }}
          />

          <div
            style={{
              position: "relative",
              height: 54 * scale,
              minWidth: 0,
              flex: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                opacity: partner.opacity,
                translate: `0px ${partner.translateY * scale}px`,
                fontSize: 18 * scale,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "0.035em",
                textTransform: "uppercase",
                textShadow: "0 2px 8px #000",
              }}
            >
              Официальный партнёр ARC Store
            </div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                opacity: offer.opacity,
                translate: `0px ${offer.translateY * scale}px`,
                color: "#c2e97b",
                fontSize: 20 * scale,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "0.025em",
                textTransform: "uppercase",
                textShadow: "0 2px 8px #000",
              }}
            >
              Скидка 10% · промокод ANGEL
            </div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                opacity: destination.opacity,
                translate: `0px ${destination.translateY * scale}px`,
                fontSize: 22 * scale,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                textShadow: "0 2px 8px #000",
              }}
            >
              ARC-STORE.RU/ROB-RUN
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 22 * scale,
            right: 22 * scale,
            bottom: 0,
            height: 2 * scale,
            background:
              "linear-gradient(90deg,transparent,#c2e97b 14%,#eaffc7 50%,#c2e97b 86%,transparent)",
            opacity: 0.7 + Math.sin(phase) * 0.18,
            boxShadow: `0 0 ${9 * scale}px rgba(194,233,123,.55)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
