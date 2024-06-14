import Header from "../_components/Header";
import SignInButton from "../_components/SignInButton";
import PlanCard from "../_components/PlanCard";

export default function Presente() {
  return (
    <div className="dark dark:text-zinc-200">
      <Header nav={false} />
      <section id="plans" className="flex flex-col items-center justify-center py-32">
        <h1 className="text-5xl font-bold ">Seja bem-vindo ao InBook!</h1>
        <p className="text-lg mt-4 text-center">
          Parabéns! Você ganhou 30 dias gratuitos do nosso plano{" "}
          <span className="font-bold text-secundariaClaro">PREMIUM</span>
        </p>
        <div className="mt-8 flex flex-col items-center gap-8">
          <div className="flex justify-center gap-8">
            <PlanCard plan={"free"} />
            <PlanCard plan={"premium"} />
          </div>
          <SignInButton size="small" />
        </div>
      </section>
    </div>
  );
}
