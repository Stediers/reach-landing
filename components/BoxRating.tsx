import { motion, Reorder } from "framer-motion";
import { AiFillStar } from "react-icons/ai";

const svgVariants = {
  hidden: {
    opacity: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function BoxRating({
  rating,
  textClassName = "text-sm",
  iconClassName = "text-base",
}: {
  rating: number | null;
  textClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`p-1 ${
        rating == null
          ? "bg-gray"
          : rating >= 4.5
          ? "bg-rating-4.5"
          : rating >= 4 && rating < 4.5
          ? "bg-rating-4"
          : rating >= 3.5 && rating < 4
          ? "bg-rating-3.5"
          : rating >= 3 && rating < 3.5
          ? "bg-rating-3"
          : rating >= 2.5 && rating < 3
          ? "bg-rating-2.5"
          : rating >= 2 && rating < 2.5
          ? "bg-rating-2"
          : rating >= 1.5 && rating < 2
          ? "bg-rating-1.5"
          : rating >= 1 && rating < 1.5
          ? "bg-rating-1"
          : "bg-gray"
      } rounded-md px-2 flex items-center justify-center space-x-1 w-fit bg-success`}
    >
      <p className={`text-white font-medium ${textClassName}`}>
        {rating != null ? Number(rating).toFixed(1) : "-"}
      </p>
      <AiFillStar className={`text-white ${iconClassName}`} />
    </div>
  );
}
