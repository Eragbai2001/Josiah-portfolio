export interface CardData {
  id: number;
  title: string;
  image: string;
  gif: string;
  description: string;
}

export const cards: CardData[] = [
  {
    id: 1,
    title: "Card One",
    image: "/Matric pic.jpg",
    gif: "/gifs/bg1.gif",
    description: "This is a description for card one.",
  },
  {
    id: 2,
    title: "Card Two",
    image: "/images/img2.png",
    gif: "/gifs/bg2.gif",
    description: "This is a description for card two.",
  },
  {
    id: 3,
    title: "Card Three",
    image: "/images/img3.png",
    gif: "/gifs/bg3.gif",
    description: "This is a description for card three.",
  },
];
