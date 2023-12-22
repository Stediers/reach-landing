import { motion } from "framer-motion";
import Link from "next/link";

export default function HeaderComponent({
  title,
  link,
  animate = false,
}: {
  title: string;
  link?: {
    href: string;
    icon: JSX.Element;
  };
  animate?: boolean;
}) {
  console;
  if (link == undefined) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 pt-8 pb-2">
        <h1 className="text-2xl font-medium text-center first-letter:capitalize">
          {title}
        </h1>
        <div className="h-px w-[80%] bg-primary" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row items-center justify-between w-full pt-8 pb-2">
        <h1 className="text-2xl font-medium text-center">{title}</h1>
        <Link href={link.href}>
          {animate ? (
            <motion.div
              animate={{ rotate: [360, 0, 0, 0, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {link.icon}
            </motion.div>
          ) : (
            link.icon
          )}
        </Link>
      </div>
    );
  }
}
