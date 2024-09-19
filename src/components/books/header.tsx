'use client';

import { ChevronLeft, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type HeaderProps = {
  variant: 'primary' | 'secondary';
  bookId?: number;
  title?: string;
};

export function Header({ variant, bookId, title }: HeaderProps) {
  const { setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-5">
      {variant === 'primary' && (
        <a href="/home">
          <ChevronLeft size={36} className="text-zinc-950 dark:text-zinc-50" />
        </a>
      )}
      {variant === 'secondary' && (
        <div className="flex w-full items-center justify-between">
          <a href={`/home/books/${bookId}`}>
            <X size={36} className="text-zinc-950 dark:text-zinc-50" />
          </a>
          <h1 className="text-xl font-semibold">{title}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}
