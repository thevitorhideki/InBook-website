import Header from "../_components/Header";
import SignInButton from "../_components/SignInButton";
import PlanCard from "../_components/PlanCard";

export default function Home() {
  return (
    <>
      <Header nav={false} />
      <section id="plans" className="flex flex-col items-center justify-center py-32">
        <h1 className="text-3xl font-bold">Seja bem-vindo ao InBook!</h1>
        <p className="mt-4 text-center">
          Parabéns! Você ganhou 30 dias gratuitos do nosso plano{" "}
          <span className="font-bold text-amber-500">PREMIUM</span>
        </p>
        <div className="mt-8 flex flex-col items-center gap-8">
          <div className="flex justify-center gap-8">
            <PlanCard plan={"free"} />
            <PlanCard plan={"premium"} />
          </div>
          <SignInButton size="small" />
        </div>
      </section>
    </>
  );
}
