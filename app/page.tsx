"use client";

import Image from "next/image";
import { useState } from "react";

import Header from "./_components/Header";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMouseOver = () => {
    setIsModalVisible(true);
  };

  const handleMouseOut = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center gap-4 pt-56">
        <h1 className="max-w-4xl text-center text-6xl font-bold">
          A maior biblioteca do mundo na palma da sua mão
        </h1>
        <a
          className="rounded-md bg-amber-400 px-24 py-4 text-4xl text-white"
          href="#signin"
        >
          Vamos lá
        </a>
        <p>
          Já tenho cadastro.{" "}
          <a className="font-bold" href="#login">
            Entrar
          </a>
        </p>
      </main>
      <section
        id="features"
        className="flex flex-col items-center justify-center pt-80"
      >
        <h1 className="text-3xl font-bold">
          Venha ter uma nova experiência com os seus livros favoritos
        </h1>
        <div className="mt-16 grid grid-cols-3 gap-16 text-xl">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/300/png"
              alt="Dispositivos"
              width={200}
              height={200}
            />
            <p>Acesse onde e quando quiser</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/300/png"
              alt="Dispositivos"
              width={200}
              height={200}
            />
            <p>Escute um trecho desse livro</p>
            <button className="rounded-lg bg-black px-6 py-2 text-white">
              Play
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="https://placehold.co/300/png"
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
      <section
        id="plans"
        className="flex flex-col items-center justify-center py-80"
      >
        <h1 className="text-3xl font-bold">
          Tenha uma experiência ainda melhor com o nosso plano{" "}
          <span className="text-amber-500">PREMIUM</span>
        </h1>
        <div className="mt-16 flex justify-center gap-8">
          <div className="w-2/5 rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Free</h2>
              <p>R$0,00</p>
            </div>
            <ul className="mt-4 list-inside list-disc marker:text-slate-400">
              <li>Acesso ilimitado aos eBooks e audiobooks</li>
              <li>Anúncios a cada capitulo</li>
            </ul>
          </div>
          <div className="w-2/5 rounded-xl border-2 border-amber-500 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-amber-500">PREMIUM</h2>
              <p>R$39.90/mês</p>
            </div>
            <ul className="mt-4 list-inside list-disc marker:text-amber-500">
              <li>Acesso ilimitado aos eBooks e audiobooks</li>
              <div className="group relative">
                <li>
                  <b
                    className="cursor-pointer hover:underline"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    Vozes personalizadas
                  </b>{" "}
                  nos audiobooks
                  {isModalVisible && (
                    <div className="absolute z-50 rounded-md border border-slate-100 bg-white p-4 shadow-lg">
                      <p>
                        Experiência inédita na qual você pode ouvir a voz do seu
                        personagem favorito ou até o autor da obra
                      </p>
                    </div>
                  )}
                </li>
              </div>
              <li>Baixe os eBooks e audiobooks para ouvir offline</li>
            </ul>
          </div>
        </div>
        <button className="mt-8 rounded-md bg-amber-500 px-16 py-2 text-xl text-white">
          Vamos lá
        </button>
      </section>
    </>
  );
}
