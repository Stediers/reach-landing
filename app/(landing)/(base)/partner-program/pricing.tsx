import * as motion from "motion/react-client";
import { Check, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import AppDownload from "@components/DownloadApp";

export default function Pricing() {
  return (
    <HeaderWrapper
      title={
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="!leading-snug"
          viewport={{ amount: 0.6, once: true }}
        >
          The <br /> <span className="font-medium">Right</span>
          {"  "}Price
        </motion.span>
      }
      className="bg-[#5755ca] text-white items-center justify-center w-full flex flex-col space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <PricingCard
          title="Free"
          description="The complete reachgig experience for free."
          price={0}
          commision={0}
          features={[
            "Personalized Profile",
            "Lead Generation",
            "Maximum of 5 services",
            "Proof of Appointment",
            "Automated Appointment Flows",
            "Dispute Resolution Team",
          ]}
          tag="No upfront costs"
        />
      </div>
    </HeaderWrapper>
  );
}

function PricingCard({
  title,
  description,
  commision,
  price,
  features,
  className,
  capped,
  tag,
}: {
  title: string;
  description: string;
  commision?: number;
  features: string[];
  className?: string;
  capped?: number;
  tag: string;
  price: number | string;
}) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        bounce: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.6, once: true }}
      variants={cardVariants}
    >
      <Card
        className={`w-full ${className} lg:!p-10 !p-5 !justify-between !space-y-10 bg-white text-black`}
      >
        <div className="flex flex-col items-start justify-start h-full space-y-10">
          <motion.div
            variants={contentVariants}
            className="flex flex-col items-start justify-start space-y-5"
            viewport={{ amount: 0.6, once: true }}
          >
            <Badge className="bg-[#5755ca] text-white">{tag}</Badge>
            <h3 className="text-3xl font-medium">{title}</h3>
            <p className="text-lg">{description}</p>
            {commision != undefined ? (
              <div className="flex flex-col items-start justify-start space-y-5">
                <p className="text-3xl font-medium w-full flex flex-row space-x-2 items-center">
                  <span>{commision}</span>
                  <Percent size={20} />
                  <span className="text-lg font-normal">Advance</span>
                </p>
                {capped && (
                  <p className="text-lg font-normal">
                    Capped at{" "}
                    <span className="text-success font-medium">₹{capped}</span>
                  </p>
                )}
              </div>
            ) : (
              <p className="text-3xl font-medium w-full flex flex-row space-x-2 items-center">
                <span>₹ {price}</span>
                <span className="text-lg font-normal">/ month</span>
              </p>
            )}
          </motion.div>

          <ul className="flex flex-col items-start justify-start space-y-5">
            {features.map((feature, index) => (
              <motion.li
                key={feature}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.6, once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex flex-row items-center justify-start space-x-2"
              >
                <Check size={24} className="text-success" />
                <p>{feature}</p>
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.6, once: true }}
        >
          <AppDownload
            triggerJSX={
              <Button variant="success" className="!w-full">
                Get Started with {title}
              </Button>
            }
          />
        </motion.div>
      </Card>
    </motion.div>
  );
}
