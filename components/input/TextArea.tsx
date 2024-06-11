export default function TextArea({
  title,
  value,
  onChange,
  placeholder,
  disabled = false,
  errorText,
  id,
  titleClassName = "text-base font-medium ",
  rows = 5,
  cols = 50,
}: {
  title?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  id?: string;
  titleClassName?: string;
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2 w-full">
      {title && (
        <div className="flex flex-row items-center justify-between w-full space-x-3">
          <h1 className={`${titleClassName} shrink-0`}>{title}</h1>
          <p
            className={`text-xs text-red-500 mt-1 ${errorText ? "" : "hidden"}`}
          >
            {errorText}
          </p>
        </div>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-base border-[1px] border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errorText}`}
        disabled={disabled}
        rows={rows}
        cols={cols}
      />
    </div>
  );
}
