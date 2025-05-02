'use client';

import React from 'react';
import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  className,
  iconClassName
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {description && (
              <p className="text-sm mt-1">{description}</p>
            )}
          </div>
          {icon && (
            <div className={cn("p-3 rounded-full", iconClassName)}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 