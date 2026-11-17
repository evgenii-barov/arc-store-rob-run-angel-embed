import {loadFont} from "@remotion/fonts";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

await Promise.all([
  loadFont({
    family: "Inter",
    url: staticFile("assets/Inter.woff2"),
    weight: "800",
    display: "block",
  }),
  loadFont({
    family: "AvantGarde",
    url: staticFile("assets/AvantGarde-Demi.ttf"),
    weight: "600",
    display: "block",
  }),
]);

export const AnimatedObsBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const compact = width < 1600;
  const scale = compact ? 2 / 3 : 1;
  const cardWidth = compact ? 1110 : 1660;
  const cardHeight = compact ? 108 : 160;
  const phase = (frame / durationInFrames) * Math.PI * 2;
  const pulse = 1 + Math.max(0, Math.sin(phase * 2)) * 0.018;
  const sweepX = interpolate(
    frame,
    [0, durationInFrames - 1],
    [-cardWidth * 0.22, cardWidth * 1.18],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, Arial, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          overflow: "hidden",
          clipPath:
            "polygon(0 22%, 4% 0, 96% 0, 100% 22%, 100% 78%, 96% 100%, 4% 100%, 0 78%)",
          backgroundColor: "#070906",
          boxShadow: "0 0 30px rgba(194,233,123,0.2)",
        }}
      >
        <Img
          src={staticFile("assets/rob-run-cash.webp")}
          style={{
            position: "absolute",
            inset: -8 * scale,
            width: cardWidth + 16 * scale,
            height: cardHeight + 16 * scale,
            objectFit: "cover",
            objectPosition: "50% 46%",
            scale: 1.04 + Math.sin(phase) * 0.008,
            translate: `${Math.sin(phase) * 5 * scale}px ${Math.cos(phase) * 2 * scale}px`,
          }}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(90deg,rgba(0,0,0,.98) 0%,rgba(0,0,0,.84) 31%,rgba(0,0,0,.52) 57%,rgba(0,0,0,.82) 82%,rgba(0,0,0,.98) 100%)",
          }}
        />

        <AbsoluteFill
          style={{
            opacity: 0.45 + Math.sin(phase) * 0.08,
            background:
              "repeating-linear-gradient(120deg,transparent 0 110px,rgba(194,233,123,.09) 111px 113px,transparent 114px 225px)",
            translate: `${Math.sin(phase) * 18 * scale}px 0px`,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -cardHeight * 0.2,
            left: sweepX,
            width: cardWidth * 0.13,
            height: cardHeight * 1.4,
            rotate: "12deg",
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,.05),rgba(194,233,123,.22),rgba(255,255,255,.06),transparent)",
            filter: `blur(${8 * scale}px)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "1.18fr 1fr 1fr",
            alignItems: "center",
            columnGap: 34 * scale,
            padding: compact
              ? "12px 155px 10px"
              : "18px 235px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20 * scale,
              minWidth: 0,
              translate: `0px ${Math.sin(phase) * 1.4 * scale}px`,
              filter: `brightness(${1 + Math.max(0, Math.sin(phase - 0.5)) * 0.06})`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8 * scale,
                minWidth: 0,
              }}
            >
              <Img
                src={staticFile("assets/arc-store-cart.webp")}
                style={{
                  width: 58 * scale,
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 5px #000)",
                }}
              />
              <Img
                src={staticFile("assets/arc-store-wordmark.png")}
                style={{width: 108 * scale, height: "auto", objectFit: "contain"}}
              />
            </div>
            <div
              style={{
                color: "#9aa09d",
                fontFamily: "AvantGarde, Arial, sans-serif",
                fontSize: 26 * scale,
                fontWeight: 600,
              }}
            >
              ×
            </div>
            <Img
              src={staticFile("assets/rob-run-logo.png")}
              style={{width: 210 * scale, height: "auto", objectFit: "contain"}}
            />
          </div>

          <div style={{textAlign: "center", minWidth: 0}}>
            <strong
              style={{
                display: "block",
                fontSize: 48 * scale,
                lineHeight: 0.9,
                letterSpacing: -2 * scale,
                textTransform: "uppercase",
                textShadow: "0 2px 12px #000",
                whiteSpace: "nowrap",
              }}
            >
              Скидка 10%
            </strong>
            <span
              style={{
                display: "inline-block",
                marginTop: 10 * scale,
                padding: `${7 * scale}px ${14 * scale}px ${6 * scale}px`,
                borderRadius: 3 * scale,
                backgroundColor: "#c2e97b",
                color: "#090b08",
                fontSize: 18 * scale,
                fontWeight: 800,
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                scale: pulse,
                boxShadow: `0 0 ${18 * scale}px rgba(194,233,123,${0.16 + Math.max(0, Math.sin(phase * 2)) * 0.16})`,
              }}
            >
              ПРОМОКОД ANGEL
            </span>
          </div>

          <div
            style={{
              minWidth: 0,
              textAlign: "right",
              textShadow: "0 2px 10px #000",
              opacity: 0.92 + Math.sin(phase) * 0.08,
            }}
          >
            <strong
              style={{
                display: "block",
                fontSize: 24 * scale,
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              ARC-STORE.RU/ROB-RUN
            </strong>
            <span
              style={{
                display: "block",
                marginTop: 7 * scale,
                color: "#d0d4d1",
                fontSize: 14 * scale,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              ссылка под стримом
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: cardWidth * 0.04,
            right: cardWidth * 0.04,
            bottom: 0,
            height: 3 * scale,
            background:
              "linear-gradient(90deg,transparent,#c2e97b 12%,#e9ffc2 50%,#c2e97b 88%,transparent)",
            opacity: 0.72 + Math.sin(phase) * 0.16,
            boxShadow: "0 0 12px rgba(194,233,123,.5)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
