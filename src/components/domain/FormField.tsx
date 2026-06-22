import * as React from 'react';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

export interface FormFieldError {
  message?: string;
}

export interface FormFieldProps {
  label: string;
  /** Compativel com FieldError do react-hook-form ou qualquer objeto { message? } */
  error?: FormFieldError;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, required, hint, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error?.message && (
        <p className="text-xs text-destructive">{error.message}</p>
      )}
    </div>
  );
}
