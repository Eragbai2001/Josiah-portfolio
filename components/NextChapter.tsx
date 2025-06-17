import React from "react";

interface ProjectItem {
  id: number;
  title: string;
  image: string;
  gif: string;
  description: string;
}

const items = [
  {
    id: 1,
    title: "Unitest CBT",
    image: "/image.png",
    gif: "/api/placeholder/450/550",
    description:
      "A computer-based testing platform designed to help students prepare effectively for examinations through recent past questions and AI for generating tests from course notes.",
  },
  {
    id: 2,
    title: "Project Two",
    image: "/api/placeholder/450/550",
    gif: "/api/placeholder/450/550",
    description: "This is a description for project two.",
  },
  {
    id: 3,
    title: "Project Three",
    image: "/api/placeholder/450/550",
    gif: "/api/placeholder/450/550",
    description: "This is a description for project three.",
  },
];

const Single = ({ item }: { item: ProjectItem }) => {
  return (
    <section className="mb-4 p-4 border border-gray-600 rounded bg-white">
      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
      <p className="text-gray-300">{item.description}</p>
    </section>
  );
};

const NextChapter = () => {
  return (
    <div className="p-6 w-full max-w-4xl">
      <h2 className="text-5xl font-bold mb-6 text-white">Projects</h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <Single key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NextChapter;