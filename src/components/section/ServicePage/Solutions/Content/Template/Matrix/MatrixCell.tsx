type Props = {
  valueBoolean?: boolean;
  valueText?: string;
  highlight?: boolean;
  compact?: boolean;
};

export default function MatrixCell({
  valueBoolean,
  valueText,
  highlight,
  compact = false,
}: Props) {
  const isText = typeof valueText === "string" && valueText.length > 0;

  return (
    <div
      className={`${compact ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm"} font-medium text-center ${compact ? "rounded-none" : "rounded-2xl"} shadow-bumn-2 flex items-center justify-center border border-bumnslate-10
      ${
        highlight
          ? "text-bumnblue-4 bg-white"
          : "text-bumnslate-7 bg-white"
      }`}
    >
      {isText ? (
        <span className="leading-snug">{valueText}</span>
      ) : valueBoolean === true ? (
        <span className={compact ? "text-sm font-semibold" : "text-md font-semibold"}>✓</span>
      ) : (
        <span className={compact ? "text-sm" : "text-md"}>–</span>
      )}
    </div>
  );
}