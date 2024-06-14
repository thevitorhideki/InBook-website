interface ISignInButtonProps {
  size: "small" | "large";
}

export default function SignInButton(props: ISignInButtonProps) {
  return (
    <a href="/login">
      <button
        className={`font-bold rounded-md bg-secundariaClaro text-white transition-all hover:bg-secundariaClaro/90 ${
          props.size === "small" ? "px-16 py-2 text-xl" : "px-24 py-4 text-4xl"
        }`}
      >
        Vamos lá!
      </button>
    </a>
  );
}
