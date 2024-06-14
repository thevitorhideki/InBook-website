import Image from "next/image";

import Header from "./_components/Header";
import SignInButton from "./_components/SignInButton";
import PlanCard from "./_components/PlanCard";

export default function Home() {
  return (
    <div className="">
      <Header nav={true}/>
      <main className="flex flex-col items-center justify-center pt-64 dark:text-zinc-50">
        <h1 className="max-w-4xl text-center text-6xl font-bold mb-8">
          A maior biblioteca do mundo na palma da sua mão
        </h1>
        <SignInButton size="large"/>
        <p className="mt-2">
          Já tenho cadastro.{" "}
          <a className="font-bold hover:underline" href="#login">
            Entrar
          </a>
        </p>
      </main>

      <section id="features" className="flex flex-col items-center justify-center pt-80 dark:text-zinc-200">
        <h1 className="text-3xl font-bold">Venha ter uma nova experiência com os seus livros favoritos</h1>
        <div className="mt-16 grid grid-cols-3 gap-16 text-xl">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/200/png"
              alt="Dispositivos"
              width={200}
              height={200}
            />
            <p>Acesse onde e quando quiser</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/200x250/png"
              alt="Dispositivos"
              width={200}
              height={250}
            />
            <p>Escute um trecho desse livro</p>
            <button className="rounded-lg bg-secundariaClaro dark:bg-secundariaEscuro hover:bg-secundariaClaro/90 px-14 py-1 text-white mt-3">
              Play
            </button>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Image
              src="https://placehold.co/200/png"
              alt="Dispositivos"
              width={200}
              height={200}
            />
            <p>
              +200.000 eBooks <br />
              +100.000 Audiobooks
            </p>
          </div>
        </div>
      </section>

      <section id="plans" className="flex flex-col items-center justify-center py-80 dark:text-gray-100">
        <h1 className="text-3xl font-bold dark:text-zinc-300">
          Tenha uma experiência ainda melhor com o nosso plano <span className="text-secundariaClaro">PREMIUM</span>
        </h1>
        <div className="flex flex-col items-center gap-8">
          <div className="mt-16 flex justify-center gap-8">
            <PlanCard plan={"free"} />
            <PlanCard plan={"premium"} />
          </div>
          <SignInButton size="small" />
        </div>
      </section>
    </div>
  );
}
