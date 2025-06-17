// CardTransitionDemo.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const cards = [
  { id: 1, title: "Project One", image: "/Matric pic.jpg" },
  { id: 2, title: "Project Two", image: "/Matric pic.jpg" },
  { id: 3, title: "Project Three", image: "/Matric pic.jpg" },
];

export default function CardTransitionDemo() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelect = (card:any) => setSelectedCard(card);
  const handleClose = () => setSelectedCard(null);

  return (
    <div className="min-h-screen bg-black text-white p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          layoutId={`card-${card.id}`}
          onClick={() => handleSelect(card)}
          className="bg-gray-900 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={card.image}
            alt="Card Image"
            width={600}
            height={300}
            className="w-full h-48 object-cover"
            unoptimized
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{card.title}</h2>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            layoutId={`card-${selectedCard.id}`}
            className="fixed top-0 left-0 w-full h-full bg-black/90 z-50 p-10 flex flex-col items-center justify-center"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-3xl bg-gray-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedCard.image}
                alt="Expanded"
                width={1000}
                height={500}
                className="w-full h-96 object-cover"
                unoptimized
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedCard.title}
                </h2>
                <p className="text-lg opacity-80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
                  reiciendis.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
