import { SignedIn, SignOutButton } from '@clerk/nextjs';

export default function Index() {
  return (
    <SignedIn>
      <SignOutButton redirectUrl="/" />
    </SignedIn>
  );
}
