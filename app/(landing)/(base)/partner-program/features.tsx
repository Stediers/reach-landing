import React from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";

interface Feature {
  id: string;
  number: string;
  title: string;
  description?: string;
  isExpanded?: boolean;
  onToggle?: (id: string) => void;
  preview?: {
    image: string;
    title: string;
    description: string;
    price: string;
  };
}

interface FeaturesListProps {
  features?: Feature[];
}

export default function FeaturesList({
  features = [
    { id: "1", number: "01", title: "Offer 1:1 sessions" },
    {
      id: "2",
      number: "02",
      title: "Setup Priority DM in seconds",
      description:
        "Let your followers ask text based Priority DM. Then answer as per your convenience",
    },
    { id: "3", number: "03", title: "Host a webinar" },
    { id: "4", number: "04", title: "Bundle your services" },
    { id: "5", number: "05", title: "Sell courses & products" },
    { id: "6", number: "06", title: "Sell a subscription" },
  ],
}: FeaturesListProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 lg:space-y-20 w-full lg:px-10 py-10">
      <div className="flex max-w-7xl px-5 flex-col lg:flex-row items-center justify-between lg:gap-x-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl lg:text-5xl !leading-snug font-medium mb-6">
            What you can do with your&nbsp;
            <span className="text-primary first-letter:capitalize">Page</span>
          </h2>
          <p className="text-xl text-gray-600">
            Choose from a variety of features to make your page stand out
          </p>
        </motion.div>
        <div className="flex flex-col max-w-7xl items-center justify-center lg:w-1/2 w-full">
          <Accordion type="single" collapsible className="w-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.6, once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  bounce: 0.2,
                }}
              >
                <AccordionItem value={feature.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-medium">
                        {feature.number}
                      </span>
                      <p className="text-xl lg:text-2xl font-medium text-left">
                        {feature.title}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col lg:flex-row gap-8 mt-4">
                      {feature.description && (
                        <div className="lg:w-1/2">
                          <p className="text-lg text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      )}
                      <div className="lg:w-1/2">
                        <div className="bg-[#EDE9FE] p-8 rounded-3xl">
                          <div className="bg-white rounded-xl p-6">
                            {feature.preview && (
                              <>
                                <Image
                                  src={feature.preview.image}
                                  alt={feature.preview.title}
                                  width={400}
                                  height={200}
                                  className="w-full mb-4"
                                />
                                <h3 className="font-medium text-xl mb-2">
                                  {feature.preview.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                  {feature.preview.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">
                                    {feature.preview.price}
                                  </span>
                                  <button className="bg-black text-white px-4 py-1 rounded-full text-sm">
                                    Ask
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
