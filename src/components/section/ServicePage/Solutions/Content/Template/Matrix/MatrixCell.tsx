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
    <td
      className={`px-4 py-3 text-center text-sm font-medium align-middle
        ${
          highlight
            ? "text-bumnblue-4"
            : "text-bumnslate-7"
        }`}
    >
      {isText ? (
        <span className="block leading-snug">
          {valueText}
        </span>
      ) : valueBoolean === true ? (
        <span className="text-lg font-semibold">✓</span>
      ) : (
        <span className="text-lg">–</span>
      )}
    </td>
  );
}
