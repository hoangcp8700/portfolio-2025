import React from 'react';

import { cn } from '@/shared/lib/utils';

import {
  Dialog as DialogUI,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '../ui/dialog';

export type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Ignored in static version; kept so callers don't break. */
  layoutId?: string;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Ignored in static version; kept so callers don't break. */
  imageLayoutId?: string;
  /** Optional cover node (e.g., Image) */
  cover?: React.ReactNode;
};

/**
 * Dialog (static debug build)
 * A plain shadcn/ui Dialog without Framer Motion.
 * Use this to debug hydration/SSR issues. Drop-in compatible with the animated version.
 */
export function Dialog({
  open,
  onOpenChange,
  className,
  title,
  description,
  children,
  cover,
}: DialogProps) {
  return (
    <DialogUI open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />

        <DialogContent
          className={cn('bg-card rounded-2xl border p-0 shadow-2xl', className)}
        >
          {cover}

          {(title || description) && (
            <DialogHeader className="px-6 pt-6">
              {title && (
                <DialogTitle className="font-display text-xl">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription className="text-muted-foreground mt-1 text-sm">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}

          {children}
        </DialogContent>
      </DialogPortal>
    </DialogUI>
  );
}
