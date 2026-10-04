import { ArrowUp } from "@phosphor-icons/react";
import { profile } from "../../data/profile";
import { scrollToId } from "../../lib/lenis";
import { Meander } from "../art/Ornaments";
import Decrypt from "../ui/Decrypt";

export default function Footer() {
  const year = new Date().getFullYear();
  const oracle = profile.oracles[2];
  return (
    <footer className="mt-28 sm:mt-40">
      <Meander className="text-accent/60" />
      <div className="mx-auto flex max-w-site flex-col gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>
          © {year} {profile.name}. {profile.location}.
        </p>
        <Decrypt
          greek={oracle.greek}
          english={oracle.english}
          delay={400}
          className="text-xs font-bold uppercase tracking-inscription text-ink/70"
        />
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          className="link-line inline-flex items-center gap-2 self-start font-semibold text-ink sm:self-auto"
        >
          Back to the summit
          <ArrowUp size={14} weight="bold" />
        </a>
      </div>
    </footer>
  );
}
