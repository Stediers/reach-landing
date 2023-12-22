import Loading from "@components/Loading";
import { showInfoPopup, showOkPopup } from "@components/notifications/Popup";
import { State } from "@data/enums";
import { AiFillPlusCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { FaExclamationTriangle } from "react-icons/fa";

export default function TextInput({
  title,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  showInfo = false,
  infoIcon,
  infoText,
  errorText,
  onKeyDown,
  id,
  titleClassName = "text-base font-medium ",
  onClick,
  autoFocus = false,
  maxLength,
  mandatory = false,
  loading = State.SUCCESS,
}: {
  title?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "tel";
  disabled?: boolean;
  errorText?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  titleClassName?: string;
  onClick?: () => void;
  showInfo?: boolean;
  infoIcon?: JSX.Element;
  infoText?: string | JSX.Element;
  autoFocus?: boolean;
  maxLength?: number;
  mandatory?: boolean;
  loading?: State;
}) {
  return (
    <div className="flex flex-col items-start justify-start space-y-1 w-full">
      <div className="flex flex-row items-center justify-between w-full space-x-3">
        <div className="flex flex-row items-center justify-start space-x-1">
          <p className={`font-medium ${titleClassName} shrink-0`}>{title}</p>
          {showInfo && (
            <AiOutlineInfoCircle
              className="text-lg shrink-0 text-info"
              onClick={() => {
                showInfoPopup({
                  icon: infoIcon,
                  title: title!,
                  message: infoText!,
                });
              }}
            />
          )}
          {mandatory && <p className="text-error">*</p>}
        </div>
        <p
          className={`text-xs lg:text-sm text-error mt-1 text-ellipsis overflow-hidden whitespace-nowrap ${
            errorText ? "" : "hidden"
          }`}
        >
          {errorText}
        </p>
      </div>
      <div className="relative w-full">
        <input
          id={id}
          autoFocus={autoFocus ? true : false}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (
              (type === "number" || type == "tel") &&
              isNaN(Number(e.target.value))
            ) {
              return;
            } else if (maxLength && e.target.value.length > maxLength) {
              return;
            } else onChange(e.target.value);
          }}
          className={`w-full text-base border-[1px] border-text rounded-md ${
            value ? "pr-8" : ""
          } p-[0.65rem] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none ${errorText} ${
            disabled ? "bg-gray" : "bg-white"
          }`}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onFocus={(e) => e.target.select()}
        />
        {onClick && (
          <AiFillPlusCircle
            className="absolute right-2 top-[0.65rem] text-xl text-primary bg-white cursor-pointer"
            onClick={onClick}
          />
        )}
        {loading !== State.SUCCESS && (
          <div className="absolute right-2 top-[0.85rem]">
            {loading === State.LOADING ? (
              <Loading />
            ) : (
              <FaExclamationTriangle className="text-error text-lg" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
