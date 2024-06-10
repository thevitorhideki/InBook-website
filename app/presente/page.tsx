"use client";

import Image from "next/image";
import { useState } from "react";

import Header from "../_components/Header";

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
      <section
        id="plans"
        className="flex flex-col items-center justify-center py-32"
      >
        <h1 className="text-3xl font-bold">
          Seja bem-vindo ao InBook!
        </h1>
        <p className="mt-4 text-center">
          Parabéns! Você ganhou 30 dias gratuitos do nosso plano <span className="text-amber-500 font-bold">PREMIUM</span>
        </p>
        <div className="mt-16 flex justify-center gap-8">
          <div className="w-2/5 rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Gratuito</h2>
              <p>R$ 0,00</p>
            </div>
            <ul className="mt-4 list-inside list-disc marker:text-slate-400">
              <li>Acesso ilimitado aos eBooks e audiobooks</li>
              <li>Anúncios a cada capitulo</li>
            </ul>
          </div>
          <div className="w-2/5 rounded-xl border-2 border-amber-500 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-amber-500">PREMIUM</h2>
              <p>R$ 39,90/mês</p>
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
