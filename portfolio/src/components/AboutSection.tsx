import Image from "next/image";
import Link from "next/link";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";

export function AboutSection() {
  const current = PROJECTS[0];
  const currentShot = current?.images[0];

  return (
    <section id="about" className="py-16 sm:py-20 px-6 max-w-5xl mx-auto">
      <div className="font-handwriting text-xl text-neutral-600 -rotate-3 mb-6">
        about me!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start">
        {/* Photo polaroid */}
        <div className="bg-white p-3 pb-7 shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-neutral-200 -rotate-2 w-52 mx-auto md:mx-0 relative">
          <div className="bg-[#93C5FD]/80 w-16 h-5 -rotate-45 absolute -top-2.5 -left-4" />
          <div className="relative w-full aspect-[4/5] overflow-hidden border border-neutral-200 bg-neutral-100">
            <Image
              src="/pic.png"
              alt="Vikrant Choudhary"
              fill
              className="object-cover object-[center_10%] scale-[1.85] origin-top"
            />
          </div>
          <div className="mt-2 text-center font-handwriting text-base text-neutral-700 font-bold">
            vikrant
          </div>
        </div>

        <div className="space-y-4">
          {PERSONAL_INFO.about.map((paragraph) => (
            <p key={paragraph} className="text-lg text-neutral-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="font-mono text-xs text-neutral-500 font-bold">
            {PERSONAL_INFO.education} · {PERSONAL_INFO.location}
          </p>

          {current && currentShot && (
            <Link
              href={`/projects/${current.slug}`}
              className="mt-6 block bg-white p-3 pb-5 border border-neutral-200 shadow-[0_10px_25px_rgba(0,0,0,0.10)] rotate-1 hover:rotate-0 transition-transform max-w-md"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
                <Image src={currentShot.src} alt={currentShot.alt} fill className="object-cover" />
              </div>
              <div className="mt-2 font-handwriting text-lg text-neutral-700 font-bold text-center">
                what I&apos;m building right now: {current.name}
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
