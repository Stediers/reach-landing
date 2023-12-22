import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

export default function Checker({
  text,
  checked,
  id,
}: {
  text: string;
  checked: boolean;
  id: string;
}): JSX.Element {
  return (
    <div
      className="flex items-center space-x-2"
      onClick={() => scrollToDiv(id)}
    >
      {checked ? (
        <AiFillCheckSquare className="text-2xl text-success lg:bg-white shrink-0" />
      ) : (
        <AiFillCloseSquare className="text-2xl text-error lg:bg-white shrink-0" />
      )}
      <p className=" text-lg font-medium first-letter:capitalize">{text}</p>
    </div>
  );
}

function scrollToDiv(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
