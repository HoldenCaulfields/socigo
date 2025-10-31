import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
}

export default function Section({ id, title, children, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-screen flex flex-col justify-center px-8 md:px-24 py-16 ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <div className="max-w-3xl text-lg leading-relaxed">{children}</div>
    </section>
  );
}
