interface ISignInButtonProps {
  size: "small" | "large";
}

export default function SignInButton(props: ISignInButtonProps) {
  return (
    <a href="/login">
      <button
        className={`rounded-md bg-amber-500 text-white transition-all hover:bg-amber-600 ${
          props.size === "small" ? "px-16 py-2 text-xl" : "px-24 py-4 text-4xl"
        }`}
      >
        Vamos lá!
      </button>
    </a>
  );
}
