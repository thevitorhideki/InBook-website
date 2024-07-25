import clsx from 'clsx';
import { Check } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Button } from './button';

type PricingCardProps = {
  features: string[];
  plan: 'Free' | 'Premium';
  price: number;
} & HTMLAttributes<HTMLDivElement>;

export function PricingCard({
  features,
  plan,
  price,
  children,
}: PricingCardProps) {
  return (
    <div
      className={clsx('flex w-2/5 flex-col gap-4 rounded-xl border-2 p-6', {
        'border-amber-500 dark:border-amber-600': plan === 'Premium',
        'border-zinc-300 dark:border-zinc-800': plan === 'Free',
      })}
    >
      <h2 className="text-xl font-semibold">{plan}</h2>
      <div>
        <h1 className="text-3xl font-bold">
          R${price.toString().replace('.', ',')}
        </h1>
        {plan !== 'Free' && (
          <p className="text-sm text-muted-foreground">Cobrados mensalmente</p>
        )}
        {plan === 'Free' && (
          <p className="text-sm text-muted-foreground">Grátis para sempre</p>
        )}
      </div>
      <Button variant={'outline'}>
        {plan === 'Free' ? 'Começar' : 'Assinar'}
      </Button>
      <ul className="flex flex-col gap-2">
        {features.map((feature) => (
          <li className="grid-cols-min-content-auto grid gap-2" key={feature}>
            <Check
              className={clsx('inline-block h-6 w-6', {
                'text-amber-500 dark:text-amber-600': plan === 'Premium',
                'text-zinc-400 dark:text-zinc-700': plan === 'Free',
              })}
            />
            <span>{feature}</span>
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
}
