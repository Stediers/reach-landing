import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
import QRCode from "react-qr-code";
import Setting from "@components/Setting";
import { createRoot } from "react-dom/client";
import {
  AiFillCloseCircle,
  AiFillCopy,
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FcSms } from "react-icons/fc";
import { BiPhoneCall } from "react-icons/bi";
import ImageComponent from "@components/ImageComponent";
import { StaticImageData } from "next/image";
import PopupWrapper from "@wrapper/PopupWrapper";
import { State } from "@data/enums";
import AvatarEditor from "react-avatar-editor";
import { showSnackBar } from "./Snackbar";
import devLog from "@helper_functions/devLog";
import { FcInfo } from "react-icons/fc";
import InfoIcon from "@public/lottie/info-icon.json";
interface ImagePopupProps {
  src: string | StaticImageData;
  alt: string;
  onClose: () => void;
}

function ImagePopup(props: ImagePopupProps) {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-80`}
      onClick={props.onClose}
    >
      <motion.div
        className="shadow-lg w-full rounded-lg flex flex-col items-center max-w-[400px] space-y-5"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <ImageComponent
          src={props.src}
          alt={props.alt}
          className="w-[90vw] h-[90vw] max-w-[400px] max-h-[400px]"
          popup={false}
        />
      </motion.div>
    </div>
  );
}

export async function showImagePopup({
  src,
  alt,
}: {
  src: string | StaticImageData;
  alt: string;
}): Promise<boolean> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  return new Promise((resolve, reject) => {
    const onClose = () => {
      // ReactDOM.unmountComponentAtNode(container);
      root.unmount();
      resolve(false);
    };

    root.render(<ImagePopup src={src} alt={alt} onClose={onClose} />);
  });
}

type CustomJSXPopupProps = {
  jsx: JSX.Element;
  onOk?: () => void;
  onClose?: () => void;
  preventDefault?: boolean;
  okText?: string;
  cancelText?: string;
  title?: string;
  showOkButton?: boolean;
  okButtonClassName?: string;
  cancelButtonClassName?: string;
  showCancelButton?: boolean;
};

function CustomJSXPopup(props: CustomJSXPopupProps) {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-50`}
      onClick={(e) => {
        if (props.onClose) {
          props.onClose();
        }
        e.stopPropagation();
      }}
    >
      <motion.div
        className="bg-white p-4 pt-6 shadow-lg w-full rounded-lg flex flex-col items-center max-w-[400px] space-y-5"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        onClick={(e) => {
          if (props.preventDefault) {
            console.log("Prevented");
            e.stopPropagation();
          } else {
            if (props.onOk) {
              console.log("Ok");
              props.onOk();
            }
          }
        }}
      >
        {" "}
        {props.title && (
          <div className="flex flex-col items-center justify-center space-y-3 w-full">
            <h3 className="font-medium text-lg text-center">{props.title}</h3>
            <div className="h-[1px] w-full bg-gray"></div>
          </div>
        )}
        {props.jsx}
        <div className="flex flex-row items-center justify-center space-x-2 w-full">
          {props.showOkButton && (
            <Button
              text={props.okText || "OK"}
              onClick={() => {
                if (props.onOk) props.onOk();
              }}
              className={`${
                props.okButtonClassName
                  ? props.okButtonClassName
                  : "border-success border-2 w-full font-medium text-success py-2 px-5 rounded-lg"
              }`}
            />
          )}
          {props.onClose && props.showCancelButton && (
            <Button
              text={props.cancelText || "Cancel"}
              onClick={() => {
                if (props.onClose) props.onClose();
              }}
              className={`${
                props.cancelButtonClassName
                  ? props.cancelButtonClassName
                  : "border-danger border-2 w-full font-medium text-danger py-2 px-5 rounded-lg"
              }`}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export async function showCustomJSXPopup({
  jsx,
  onOk,
  onClose,
  preventDefault = false,
  okText = "OK",
  cancelText = "Cancel",
  title,
  showOkButton = true,
  okButtonClassName,
  showCancelButton = true,
  cancelButtonClassName,
}: {
  jsx: JSX.Element;
  onOk?: () => void;
  onClose?: () => void;
  preventDefault?: boolean;
  okText?: string;
  cancelText?: string;
  title?: string;
  showOkButton?: boolean;
  okButtonClassName?: string;
  cancelButtonClassName?: string;
  showCancelButton?: boolean;
}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return new Promise((resolve, reject) => {
    const onOk_ = () => {
      onOk && onOk();
      root.unmount();
      resolve(true);
    };

    const onClose_ = () => {
      onClose && onClose();
      root.unmount();
      resolve(false);
    };

    if (document.body.classList.contains("overflow-hidden")) return;

    root.render(
      <CustomJSXPopup
        jsx={jsx}
        onOk={onOk_}
        onClose={onClose_}
        preventDefault={preventDefault}
        okText={okText}
        cancelText={cancelText}
        title={title}
        showOkButton={showOkButton}
        okButtonClassName={okButtonClassName}
        cancelButtonClassName={cancelButtonClassName}
      />
    );
  });
}

type InfoPopupProps = {
  icon?: JSX.Element;
  message: string | JSX.Element;
  onOk: () => void;
  title: string;
};

function InfoPopup(props: InfoPopupProps) {
  const Lottie = require("lottie-react").default;
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-50`}
    >
      <motion.div
        className="bg-white p-4 shadow-lg w-full rounded-lg flex flex-col max-w-[400px] max-h-[90%] overflow-y-auto overflow-x-hidden"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
        {props.icon ? (
          props.icon
        ) : (
          <Lottie animationData={InfoIcon} className="h-32 my-[-2rem]" />
        )}
        <div className="flex flex-col w-full py-3">
          <h3 className="font-medium text-md text-start">{props.title}</h3>
          {typeof props.message == "string" ? (
            <p className="py-4 text-base text-start">{props.message}</p>
          ) : (
            props.message
          )}
        </div>

        <Button
          text="OK"
          onClick={props.onOk}
          className="border-success border-2 w-full font-medium text-white bg-success py-2 px-5 rounded-lg sticky bottom-2"
        />
      </motion.div>
    </div>
  );
}

export async function showInfoPopup({
  icon,
  message,
  title,
}: {
  icon?: JSX.Element;
  message: string | JSX.Element;
  title: string;
}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return new Promise((resolve, reject) => {
    const onOk = () => {
      root.unmount();
      resolve(true);
    };

    if (document.body.classList.contains("overflow-hidden")) return;

    root.render(
      <InfoPopup icon={icon} message={message} onOk={onOk} title={title} />
    );
  });
}

type CommunicationModePopupProps = {
  onSms: () => void;
  onWhatsapp: () => void;
  onCall: () => void;
  onCancel: () => void;
  mobileNumber: string;
};

function CommunicationModePopup(props: CommunicationModePopupProps) {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-50">
      <motion.div
        className="bg-white p-4 pt-6 shadow-lg w-full rounded-lg flex flex-col items-center max-w-[400px] space-y-5"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <div className="flex flex-col space-y-3 w-full">
          <Setting
            title="SMS"
            onClick={props.onSms}
            subtitle="Send a text message via sms"
            icon={<FcSms className="text-success w-7 h-7 shrink-0" />}
          />
          <Setting
            title="WhatsApp"
            onClick={props.onWhatsapp}
            subtitle="Send a text message via WhatsApp"
            icon={
              <AiOutlineWhatsApp className="text-success w-7 h-7 shrink-0" />
            }
          />
          <Setting
            title="Call"
            onClick={props.onCall}
            subtitle="Call your customer"
            icon={<BiPhoneCall className="text-text w-7 h-7 shrink-0" />}
          />
          <Setting
            title="Close"
            onClick={props.onCancel}
            subtitle="Cancel"
            titleColor="text-danger"
            className="text-danger"
            icon={
              <AiFillCloseCircle className="text-danger w-7 h-7 shrink-0" />
            }
          />
        </div>
      </motion.div>
    </div>
  );
}

export async function showCommunicationModePopup({
  mobileNumber,
}: {
  mobileNumber: string;
}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return new Promise((resolve, reject) => {
    const onSms = () => {
      root.unmount();
      resolve("sms");
      window.open(`sms:${mobileNumber}`);
    };
    const onWhatsapp = () => {
      root.unmount();
      resolve("whatsapp");
      window.open(`https://wa.me/${mobileNumber}`);
    };
    const onCall = () => {
      root.unmount();
      resolve("call");
      window.open(`tel:${mobileNumber}`);
    };
    const onCancel = () => {
      root.unmount();
      resolve("cancel");
    };

    root.render(
      <CommunicationModePopup
        onSms={onSms}
        onWhatsapp={onWhatsapp}
        onCall={onCall}
        onCancel={onCancel}
        mobileNumber={mobileNumber}
      />
    );
  });
}

type YesNoPopupProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  okText?: string;
  cancelText?: string;
};

export function YesNoPopup(props: YesNoPopupProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-50`}
    >
      <motion.div
        className="bg-white p-4 pt-6 shadow-lg w-full rounded-lg flex flex-col items-center max-w-[400px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <h3 className="font-medium text-xl">{props.title}</h3>
        <p className="pt-2 pb-5 text-md text-center">{props.message}</p>
        <div className="flex space-x-3 w-full">
          <Button
            onClick={props.onConfirm}
            text={props.okText || "Yes"}
            className="bg-success text-white py-2 rounded-lg w-full"
          />
          <Button
            className="bg-danger text-white py-2 rounded-lg w-full"
            onClick={props.onCancel}
            text={props.cancelText || "No"}
          />
        </div>
      </motion.div>
    </div>
  );
}

export async function showYesNoPopup({
  message,
  title,
  okText = "Yes",
  cancelText = "No",
}: {
  message: string;
  title: string;
  okText?: string;
  cancelText?: string;
}): Promise<boolean> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return new Promise((resolve, reject) => {
    const onConfirm = () => {
      root.unmount();
      resolve(true);
    };
    const onCancel = () => {
      root.unmount();
      resolve(false);
    };

    root.render(
      <YesNoPopup
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title={title}
        okText={okText}
        cancelText={cancelText}
      />
    );
  });
}

interface OkPopupProps {
  message: string;
  onOk: () => void;
  title: string;
}

function OkPopup(props: OkPopupProps) {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-50`}
    >
      <motion.div
        className="bg-white p-4 shadow-lg w-full rounded-lg flex flex-col items-center max-w-[400px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <h3 className="font-medium text-xl">{props.title}</h3>
        <p className="py-4 text-md text-center">{props.message}</p>
        <Button
          text="OK"
          onClick={props.onOk}
          className="border-success border-2 w-full font-medium text-success py-2 px-5 rounded-lg"
        />
      </motion.div>
    </div>
  );
}

export async function showOkPopup({
  message,
  title,
}: {
  message: string;
  title: string;
}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return new Promise((resolve, reject) => {
    const onOk = () => {
      root.unmount();
      resolve(true);
    };

    if (document.body.classList.contains("overflow-hidden")) return;

    root.render(<OkPopup message={message} onOk={onOk} title={title} />);
  });
}

interface QrCodePopupProps {
  qrCode: string;
  onOk: () => void;
  title: string;
}

function QrCodePopup(props: QrCodePopupProps) {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-50`}
    >
      <motion.div
        className="bg-white p-4 shadow-lg w-full rounded-lg flex flex-col items-center max-w-[400px] space-y-5"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <h3 className="font-medium text-xl text-center">{props.title}</h3>
        <QRCode value={props.qrCode} />
        <Button
          text="OK"
          onClick={props.onOk}
          className="border-success border-2 w-full font-medium text-success py-2 px-5 rounded-lg"
        />
      </motion.div>
    </div>
  );
}

export async function showQrCodePopup({
  code,
  title,
}: {
  code: string;
  title: string;
}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return new Promise((resolve, reject) => {
    const onOk = () => {
      root.unmount();
      resolve(true);
    };

    if (document.body.classList.contains("overflow-hidden")) return;

    root.render(<QrCodePopup qrCode={code} onOk={onOk} title={title} />);
  });
}

function ImageEditingModal({
  onOk,
  onCancel,
  borderRadius = 250,
  image,
}: {
  onOk: (image: File) => void;
  onCancel: () => void;
  borderRadius?: number;
  image: File;
}) {
  const editor = useRef<AvatarEditor>(null);
  return (
    <PopupWrapper
      onClose={() => {
        onCancel();
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-5 w-full">
        <AvatarEditor
          image={URL.createObjectURL(image)}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
          ref={editor}
          borderRadius={borderRadius}
        />
        <div className="flex flex-row items-center justify-center space-x-2 w-full">
          <Button
            className="border border-black"
            text="Remove"
            onClick={() => {
              onCancel();
            }}
          />
          <Button
            className="bg-info text-white"
            text="Save"
            onClick={async () => {
              if (editor.current) {
                const canvas = editor.current.getImageScaledToCanvas();
                canvas.toBlob((blob) => {
                  const fileTypes = ["image/png", "image/jpeg"];
                  if (!fileTypes.includes(image.type)) {
                    showSnackBar({
                      message: "Invalid image type",
                      state: State.ERROR,
                    });
                    return;
                  }
                  if (blob) {
                    onOk(new File([blob], image.name, { type: image.type }));
                  } else {
                    showSnackBar({
                      message: "Something went wrong",
                      state: State.ERROR,
                    });
                  }
                });
              } else {
                onCancel();
                showSnackBar({
                  message: "Something went wrong",
                  state: State.ERROR,
                });
              }
            }}
          />
        </div>
      </div>
    </PopupWrapper>
  );
}

export async function showImageEditingModal({
  onOk,
  onCancel,
  borderRadius = 250,
  image,
}: {
  onOk: (image: File) => void;
  onCancel: () => void;
  borderRadius?: number;
  image: File;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onClose = () => {
      root.unmount();
      onCancel();
    };

    root.render(
      <ImageEditingModal
        onOk={(image) => {
          root.unmount();
          onOk(image);
        }}
        onCancel={onClose}
        image={image}
        borderRadius={borderRadius}
      />
    );
  });
}

interface SharePopupProps {
  link: string;
  onClose: () => void;
}

function SharePopup(props: SharePopupProps) {
  return (
    <PopupWrapper onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center space-y-3 w-full">
        <Setting
          title="WhatsApp"
          onClick={() => {
            window.open(
              `https://wa.me/?text=${encodeURIComponent(props.link)}`
            );
            props.onClose();
          }}
          subtitle="Share via WhatsApp"
          icon={<AiOutlineWhatsApp className="text-success w-7 h-7 shrink-0" />}
        />
        <Setting
          title="Instagram"
          onClick={() => {
            window.open(
              `https://www.instagram.com/?url=${encodeURIComponent(props.link)}`
            );
            props.onClose();
          }}
          subtitle="Share via Instagram"
          icon={<AiFillInstagram className="text-success w-7 h-7 shrink-0" />}
        />
        <Setting
          title="Facebook"
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                props.link
              )}`
            );
            props.onClose();
          }}
          subtitle="Share via Facebook"
          icon={<AiFillFacebook className="text-info w-7 h-7 shrink-0" />}
        />
        <Setting
          title="LinkedIn"
          onClick={() => {
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                props.link
              )}`
            );
            props.onClose();
          }}
          subtitle="Share via LinkedIn"
          icon={<AiFillLinkedin className="text-info w-7 h-7 shrink-0" />}
        />
        <Setting
          title="Copy Link"
          onClick={() => {
            navigator.clipboard
              .writeText(props.link)
              .then(() => {
                showSnackBar({
                  message: "Link copied to clipboard",
                  state: State.SUCCESS,
                });
                props.onClose();
              })
              .catch(() => {
                showSnackBar({
                  message: "Something went wrong",
                  state: State.ERROR,
                });
              });
          }}
          subtitle="Copy link to clipboard"
          icon={<AiFillCopy className="text-text w-7 h-7 shrink-0" />}
        />
      </div>
    </PopupWrapper>
  );
}

export async function showSharePopup({
  link,
}: {
  link: string;
}): Promise<void> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return new Promise((resolve, reject) => {
    const onClose = () => {
      root.unmount();
      resolve();
    };

    root.render(<SharePopup link={link} onClose={onClose} />);
  });
}
