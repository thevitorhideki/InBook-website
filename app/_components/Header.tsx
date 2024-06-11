import Image from "next/image";

interface IHeaderProps {
  nav: boolean;
}

export default function Header(props: IHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold">
        <a href="/">InBook</a>
      </h1>
      {/* <Image src="/logo.svg" alt="Logo" width={200} height={200} /> */}
      {props.nav === true ? (
        <nav>
          <ul className="flex justify-between gap-20">
            <li className="hover:underline">
              <a href="#features">Experiências</a>
            </li>
            <li className="hover:underline">
              <a href="#plans">Planos</a>
            </li>
            <li className="hover:underline">
              <a href="#about">Sobre</a>
            </li>
          </ul>
        </nav>
      ) : null}
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
