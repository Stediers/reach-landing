"use client";
import Loading from "@components/Loading";
import { Badge } from "@components/ui/badge";
import { State } from "@data/enums";
import {
  AiFillCheckCircle,
  AiFillPlusCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
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
  loading,
  icon = <Badge>Add</Badge>,
  preIcon,
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
  icon?: JSX.Element;
  preIcon?: JSX.Element;
}) {
  return (
    <div className="flex flex-col items-start justify-start space-y-1 w-full">
      <div className="flex flex-row items-center justify-between w-full space-x-3">
        <div className="flex flex-row items-center justify-start space-x-1">
          <p className={`font-medium ${titleClassName} shrink-0`}>{title}</p>
          {/* {showInfo && (
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
          )} */}
          {mandatory && <p className="text-error">*</p>}
        </div>
      </div>
      <div className="relative w-full">
        {preIcon && (
          <div className="absolute h-full w-fit flex justify-center items-center pl-3">
            {preIcon}
          </div>
        )}
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
            disabled ? "bg-gray-200" : "bg-white"
          } ${preIcon ? "pl-12" : "pl-3"}`}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onFocus={(e) => e.target.select()}
        />
        <div
          onClick={onClick}
          className="absolute right-2 top-[0.65rem] bg-white cursor-pointer"
        >
          {onClick && icon}
        </div>
        {loading && (
          <div className="absolute h-full right-2 top-0 flex justify-center items-center">
            {loading === State.LOADING ? (
              <Loading className="w-5 h-5 mr-1" type="circle" />
            ) : loading === State.SUCCESS ? (
              <AiFillCheckCircle className="text-success text-xl" />
            ) : loading === State.ERROR ? (
              <FaExclamationTriangle className="text-error text-xl" />
            ) : null}
          </div>
        )}
      </div>
      <p
        className={`text-sm lg:text-sm text-error ml-1 pt-1 text-ellipsis overflow-hidden whitespace-nowrap ${
          errorText ? "" : "hidden"
        }`}
      >
        {errorText}
      </p>
    </div>
  );
}
