import { profile } from "../data/profile";
import Meander from "./Meander";
import Wings from "./Wings";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="epaphe" className="mx-auto max-w-site px-6 pt-28 sm:px-10 sm:pt-36">
      <SectionHeading numeral="Ε" title="Epaphe" gloss="Contact" />

      <Reveal className="pb-24 text-center sm:pb-32">
        <Wings className="mx-auto w-44 sm:w-56" />
        <p className="mt-6 font-body text-lg italic text-faded sm:text-xl">
          The conversation is open.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="link-carve mt-6 inline-block break-all pb-1.5 font-display text-[clamp(1.1rem,3.8vw,2.4rem)] uppercase tracking-[0.06em] text-ink transition-colors hover:text-bronze"
        >
          {profile.email}
        </a>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="meta-caps link-carve text-ink transition-colors hover:text-bronze"
          >
            Github
          </a>
          <span className="text-bronze/70" aria-hidden="true">·</span>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="meta-caps link-carve text-ink transition-colors hover:text-bronze"
          >
            Linkedin
          </a>
          <span className="text-bronze/70" aria-hidden="true">·</span>
          <a
            href={profile.resume}
            download
            className="meta-caps link-carve text-ink transition-colors hover:text-bronze"
          >
            Vita ↓
          </a>
        </div>
      </Reveal>

      <footer>
        <Meander />
        <div className="py-10 text-center">
          <p className="meta-caps text-faded">
            © {year} Om Gandhi · {profile.location}
          </p>
        </div>
      </footer>
    </section>
  );
}
