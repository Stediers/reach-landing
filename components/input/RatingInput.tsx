import { motion } from "framer-motion";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function RatingInput({
  rating,
  onChange,
  className,
  iconClassName = "w-6 h-6",
  title,
  showEmoji = false,
}: {
  rating: number;
  onChange: (rating: number) => void;
  className?: string;
  iconClassName?: string;
  title?: string;
  showEmoji?: boolean;
}) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center justify-between w-full">
        {title && <p className="text-base font-medium">{title}</p>}
        <motion.div className="flex items-center space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(i)}
            >
              {rating >= i ? (
                <AiFillStar
                  key={i}
                  className={`${iconClassName} cursor-pointer text-rating-2.5
                }`}
                  onClick={() => onChange(i)}
                />
              ) : (
                <AiOutlineStar
                  key={i}
                  className={`${iconClassName} cursor-pointer`}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      {showEmoji && rating ? (
        <p className="text-2xl">
          {rating && rating === 1
            ? "😞"
            : rating === 2
            ? "😕"
            : rating === 3
            ? "😐"
            : rating === 4
            ? "🙂"
            : rating === 5
            ? "😍"
            : ""}
        </p>
      ) : null}
    </div>
  );
}
