"use client";

import { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';

const DEFAULT_RULES = [
  { label: 'Minimo 8 caracteres', test: (v: string) => v.length >= 8 },
  { label: 'Letra maiuscula', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'Numero', test: (v: string) => /[0-9]/.test(v) },
];

export interface PasswordRule {
  label: string;
  test: (value: string) => boolean;
}

export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showRules?: boolean;
  rules?: PasswordRule[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = 'Sua senha',
  showRules = false,
  rules = DEFAULT_RULES,
  required,
  disabled,
  className,
  id,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="relative">
        <Input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className="pr-10"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          onClick={() => setVisible(!visible)}
          disabled={disabled}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {showRules && value.length > 0 && (
        <ul className="space-y-1">
          {rules.map(rule => {
            const pass = rule.test(value);
            return (
              <li
                key={rule.label}
                className={cn(
                  'text-xs flex items-center gap-1.5',
                  pass ? 'text-green-600 dark:text-green-400' : 'text-destructive',
                )}
              >
                {pass ? <Check className="h-3 w-3 shrink-0" /> : <X className="h-3 w-3 shrink-0" />}
                {rule.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function isPasswordValid(password: string, rules = DEFAULT_RULES): boolean {
  return rules.every(rule => rule.test(password));
}
