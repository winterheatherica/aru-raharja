type Props = {
  valueBoolean?: boolean;
  valueText?: string;
  highlight?: boolean;
};

export default function MatrixCell({
  valueBoolean,
  valueText,
  highlight,
}: Props) {
  const isText = typeof valueText === "string" && valueText.length > 0;

  return (
    <div
      className={`px-4 py-3 text-sm font-medium text-center rounded-2xl shadow-bumn-2 flex items-center justify-center
      ${
        highlight
          ? "text-bumnblue-4 bg-white"
          : "text-bumnslate-7 bg-white"
      }`}
    >
      {isText ? (
        <span className="leading-snug">{valueText}</span>
      ) : valueBoolean === true ? (
        <span className="text-md font-semibold">✓</span>
      ) : (
        <span className="text-md">–</span>
      )}
    </div>
  );
}