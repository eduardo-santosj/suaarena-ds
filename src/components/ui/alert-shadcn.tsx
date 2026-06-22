/**
 * Alert estático do shadcn (blocos de aviso inline, sem auto-dismiss).
 * NÃO confundir com o <Alert> customizado do DS (toast com auto-dismiss).
 *
 * Uso:
 *   import { AlertBlock, AlertBlockTitle, AlertBlockDescription } from '@sua-arena/ui';
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const alertBlockVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default:     'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        warning:     'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-500',
        success:     'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-500',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const AlertBlock = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertBlockVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertBlockVariants({ variant }), className)} {...props} />
));
AlertBlock.displayName = 'AlertBlock';

const AlertBlockTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  )
);
AlertBlockTitle.displayName = 'AlertBlockTitle';

const AlertBlockDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  )
);
AlertBlockDescription.displayName = 'AlertBlockDescription';

export { AlertBlock, AlertBlockTitle, AlertBlockDescription, alertBlockVariants };
