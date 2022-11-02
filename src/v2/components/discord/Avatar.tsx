import { EStatus } from "../../types";

interface IAvatarProp {
  image: string;
  status: EStatus;
}

export default function Avatar({ image, status }: IAvatarProp) {
  return (
    <div style={{ width: "32px", height: "32px" }}>
      <svg width="40" height="40" viewBox="0 0 40 40">
        <defs>
          <mask
            id="image-default"
            maskContentUnits="objectBoundingBox"
            viewBox="0 0 1 1"
          >
            <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
          </mask>

          <mask
            id="image-mask"
            maskContentUnits="objectBoundingBox"
            viewBox="0 0 1 1"
          >
            <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
            <circle fill="black" cx="0.84375" cy="0.84375" r="0.25" />
          </mask>

          <mask
            id="status-online"
            maskContentUnits="objectBoundingBox"
            viewBox="0 0 1 1"
          >
            <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
          </mask>

          <mask
            id="status-streaming"
            maskContentUnits="objectBoundingBox"
            viewBox="0 0 1 1"
          >
            <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
            <polygon fill="black" points="0.35,0.25 0.78301275,0.5 0.35,0.75" />
          </mask>
        </defs>

        <foreignObject
          x="0"
          y="0"
          width="32"
          height="32"
          mask={`url(#image-${
            status === EStatus.OFFLINE ? "default" : "mask"
          })`}
        >
          <div>
            <img
              src={image}
              alt="avatar"
              style={{
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </div>
        </foreignObject>

        {status === EStatus.STREAMING && (
          <rect
            width="10"
            height="10"
            x="22"
            y="22"
            fill="hsl(262, calc(var(--saturation-factor, 1) * 46.8%), 39.8%)"
            mask="url(#status-streaming)"
          />
        )}

        {status === EStatus.ONLINE && (
          <rect
            width="10"
            height="10"
            x="22"
            y="22"
            fill="#3ba55d"
            mask="url(#status-online)"
          />
        )}
      </svg>
    </div>
  );
}
