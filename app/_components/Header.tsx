import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-evenly p-4">
      <h1 className="text-3xl font-bold">InBook</h1>
      {/* <Image src="/logo.svg" alt="Logo" width={200} height={200} /> */}
      <nav>
        <ul className="flex justify-between gap-8">
          <li>
            <a href="#features">Experiências</a>
          </li>
          <li>
            <a href="#plans">Planos</a>
          </li>
          <li>
            <a href="#about">Sobre</a>
          </li>
        </ul>
      </nav>
      <select
        name="languages"
        id="lang"
        className="rounded-md border-2 border-slate-100 bg-white p-2 focus:outline-none"
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      >
        <option value="Português">🇧🇷 Português</option>
        <option value="English">🇬🇧 English</option>
      </select>
    </header>
  );
}
