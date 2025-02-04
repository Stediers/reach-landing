import Card from "@components/Card";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import Image from "next/image";
import * as motion from "motion/react-client";

export default function TheresMore() {
  const cards = [
    {
      src: "/appointments.webp",
      heading: "Manage Appointments",
      description:
        "With our in built calendar, notificatons and reminders you can manage your appointments easily and effectively.",
    },
    {
      src: "/paid.avif",
      heading: "Secure Payments",
      description:
        "Get paid securely and easily with our integrated payment gateway",
    },
    {
      src: "/invoice.avif",
      heading: "Automated Invoices",
      description:
        "Automatically generate invoices for your clients and keep track of your earnings.",
    },
    {
      src: "/instagram.avif",
      heading: "Instagram Integration",
      description:
        "Integrate your Instagram account and showcase your previous work to your clients.",
    },
  ];

  return (
    <HeaderWrapper
      title={
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="!leading-snug"
        >
          Give Yourself <br />
          <span className="font-medium text-primary">What You Deserve</span>
        </motion.span>
      }
      mobileAlign="center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        {cards.map((card, index) => (
          <SocialMediaCard key={card.heading} {...card} index={index} />
        ))}
      </div>
    </HeaderWrapper>
  );
}

function SocialMediaCard({
  src,
  heading,
  description,
  index,
}: {
  src: string;
  heading: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        amount: 0.6,
        once: true,
      }}
      transition={{
        duration: 0.7,
        type: "spring",
        bounce: 0.2,
      }}
    >
      <Card className="flex !bg-[#FAFAFA] flex-col items-center justify-start lg:!items-start space-y-6 lg:space-y-10 !rounded-3xl px-5 py-7 lg:px-10 lg:py-14 text-black">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ amount: 0.6, once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <Image
            alt="Hero"
            src={src}
            width={200}
            height={200}
            className="w-full lg:h-[15rem] object-cover"
          />
        </motion.div>
        <div className="flex flex-col items-start justify-center lg:space-y-5 space-y-3 w-full">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.6, once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:text-2xl text-2xl font-medium w-full"
          >
            {heading}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.6, once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-md lg:text-lg"
          >
            {description}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
}
