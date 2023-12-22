import { motion } from "framer-motion";

export default function PopupWrapper({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <motion.div
      className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-50`}
      onClick={() => {
        if (onClose) {
          onClose();
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="flex flex-col items-center justify-start w-full space-y-3 bg-white p-3 overflow-y-scroll max-h-[90vh] max-w-[500px] rounded-md shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
