import Image from "next/image";

interface IHeaderProps {
  nav: boolean;
}

export default function Header(props: IHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 dark:text-zinc-200">
      <a href="/" className="text-3xl font-bold">InBook</a>
      {/* <Image src="/logo.svg" alt="Logo" width={200} height={200} /> */}
      {props.nav && (
        <nav>
          <ul className="flex justify-between gap-8">
            <li>
              <a className="hover:underline" href="#features">Experiências</a>
            </li>
            <li>
              <a className="hover:underline" href="#plans">Planos</a>
            </li>
            <li>
              <a className="hover:underline" href="#about">Sobre</a>
            </li>
          </ul>
        </nav>
      )}
      <select
        name="languages"
        id="lang"
        className="rounded-md border-2 border-gray-300 bg-primariaClaro dark:bg-primariaEscuro p-2 focus:outline-none"
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
