"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StickyContact({
  triggerJSX,
  children,
  dontShowIds = [],
}: {
  triggerJSX: React.JSX.Element;
  children: React.ReactNode;
  dontShowIds?: string[];
}) {
  //hide the sticky contact if the document has any of the ids in the dontShowIds array
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(false);
          } else {
            setVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    dontShowIds.forEach((id) => {
      const domElement = document.getElementById(id);
      if (domElement) {
        observer.observe(domElement);
      }
    });

    return () => {
      dontShowIds.forEach((id) => {
        const domElement = document.getElementById(id);
        if (domElement) {
          observer.unobserve(domElement);
        }
      });
    };
  }, [dontShowIds]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);
  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          className="sticky bottom-10 right-0 z-50 flex items-center justify-center"
          id="sticky-contact"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          key="sticky-contact"
        >
          <div>{children}</div>
        </motion.div>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
}
