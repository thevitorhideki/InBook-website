"use client";

import { useState } from "react";

interface IPlanCardProps {
  plan: "free" | "premium";
}

export default function PlanCard(props: IPlanCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMouseOver = () => {
    setIsModalVisible(true);
  };

  const handleMouseOut = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {props.plan === "free" ? (
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
      ) : (
        <div className="w-2/5 rounded-xl border-2 border-amber-500 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-amber-500">PREMIUM</h2>
            <p>R$39,90/mês</p>
          </div>
          <ul className="mt-4 list-inside list-disc marker:text-amber-500">
            <li>Acesso ilimitado aos eBooks e audiobooks</li>
            <div className="group relative">
              <li>
                <b className="cursor-pointer hover:underline" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  Vozes personalizadas
                </b>{" "}
                nos audiobooks
                {isModalVisible && (
                  <div className="absolute z-50 rounded-md border border-slate-100 bg-white p-4 shadow-lg">
                    <p>
                      Experiência inédita na qual você pode ouvir a voz do seu personagem favorito ou até o autor da
                      obra
                    </p>
                  </div>
                )}
              </li>
            </div>
            <li>Baixe os eBooks e audiobooks para ouvir offline</li>
          </ul>
        </div>
      )}
    </>
  );
}