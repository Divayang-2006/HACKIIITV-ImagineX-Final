import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'light', icon: <Sun className="h-4 w-4" />, label: 'Light' },
    { name: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Dark' },
    { name: 'maroon', icon: '🍷', label: 'Maroon' },
    { name: 'green', icon: '🌿', label: 'Green' },
    { name: 'peach', icon: '🍑', label: 'Peach' },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5 rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`flex items-center gap-2 ${theme === t.name ? 'bg-accent text-accent-foreground' : ''}`}
          >
            {typeof t.icon === 'string' ? (
              <span className="text-base">{t.icon}</span>
            ) : (
              t.icon
            )}
            <span>{t.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher; 