import Image from "next/image";

type Ratio = "16/9" | "21/9" | "4/3" | "3/2" | "4/5" | "3/4" | "1/1";

type MaterialFrameProps = {
  /** Описание кадра — одновременно ТЗ фотографу, текст плейсхолдера и alt. */
  frame: string;
  ratio: Ratio;
  /** Реальный кадр. Не задан — рендерится плейсхолдер того же размера. */
  src?: string;
  /** fill — компонент растягивается на родителя (родителю нужен relative). */
  fit?: "ratio" | "fill";
  sizes?: string;
  priority?: boolean;
  /** Приближение кадра при наведении на родителя с классом `group`. */
  zoom?: boolean;
  className?: string;
};

/**
 * Единственная точка входа для всех изображений сайта.
 * Плейсхолдер и реальное фото занимают один и тот же бокс, поэтому замена
 * `src` не меняет разметку и не даёт layout shift.
 */
export function MaterialFrame({
  frame,
  ratio,
  src,
  fit = "ratio",
  sizes = "100vw",
  priority = false,
  zoom = false,
  className = "",
}: MaterialFrameProps) {
  const box =
    fit === "fill"
      ? `absolute inset-0 overflow-hidden ${className}`
      : `relative w-full overflow-hidden ${className}`;

  const style =
    fit === "fill" ? undefined : { aspectRatio: ratio.replace("/", " / ") };

  return (
    <div className={box} style={style}>
      {src ? (
        <Image
          src={src}
          alt={frame}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${
            zoom
              ? "transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
              : ""
          }`}
        />
      ) : (
        <div
          role="img"
          aria-label={frame}
          className="@container absolute inset-0 border border-graphite bg-[#1c1a17]"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #3a3733 0 1px, transparent 1px 14px)",
            }}
          />
          {/* Описание по центру: края бокса заняты градиентами секций,
              хедером и подписями. В боксах уже 220px помещается только метка. */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="text-data hidden max-w-[42ch] text-center text-[10px] leading-[1.8] text-blade @[220px]:block sm:text-[11px]">
              <span className="text-core">[placeholder]</span> {frame}
            </p>
            <span className="text-data text-[9px] text-core @[220px]:hidden">
              ph
            </span>
          </div>
          <span className="text-data absolute right-3 bottom-3 text-[9px] text-graphite">
            {ratio}
          </span>
        </div>
      )}
    </div>
  );
}
