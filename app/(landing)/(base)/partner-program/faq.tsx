import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function FrequentlyAskedQuestions() {
  const questions = [
    {
      question: "Do I need to pay to become a partner?",
      answer:
        "Absolutely not! You can become a partner for free. You also get your own website for free.",
    },
    {
      question: "Do I pay a commission for the services I provide?",
      answer:
        "No, you do not pay a commission for the services you provide. But your clients pay a small advance fee for using our safe and secure payment gateway.",
    },
    {
      question: "How many services can I provide?",
      answer:
        "You can provide a maximum of 5 services for free. If you want to provide more services, you can upgrade to our Pro plan.",
    },
    {
      question: "How do I get paid?",
      answer:
        "You get paid directly by your clients. We do not take any commission from the services you provide.",
    },
    {
      question: "How do I get more clients?",
      answer:
        "You can get more clients by providing high-quality services and by asking your clients to leave a review on your profile.",
    },
  ];

  return (
    <section className={`w-full flex flex-col lg:py-10 items-center`}>
      <div
        className={`flex flex-col max-w-7xl justify-center space-y-7 lg:space-y-20 w-full px-5 lg:px-10 py-10`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6, once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start justify-start space-y-5"
          >
            <motion.h2
              className="text-4xl lg:text-5xl font-medium !leading-snug"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.6, once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.6, once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Can&apos;t find what you are looking for?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6, once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/contact" passHref>
                <Button variant="infoOutline">Contact Support</Button>
              </Link>
            </motion.div>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {questions.map((faq, index) => (
              <FAQCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function FAQCard({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.6, once: true }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        type: "spring",
        bounce: 0.2,
      }}
    >
      <AccordionItem value={question} className="w-full">
        <AccordionTrigger>
          <motion.div
            className="flex flex-row items-center justify-start space-x-5"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <p className="lg:text-xl text-lg text-left font-medium">
              {question}
            </p>
          </motion.div>
        </AccordionTrigger>
        <AccordionContent>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            {answer}
          </motion.p>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

export default FrequentlyAskedQuestions;
