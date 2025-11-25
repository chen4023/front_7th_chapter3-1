import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles matching badge from components.css
  "inline-flex items-center justify-center font-bold leading-none whitespace-nowrap rounded-[3px]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-[var(--gray-600)] text-white",
        success: "bg-success text-success-foreground",
        danger: "bg-destructive text-destructive-foreground",
        warning: "bg-warning text-white",
        info: "bg-info text-white",
      },
      size: {
        small: "px-1 h-4 text-[0.625rem]",
        medium: "px-2 h-5 text-xs",
        large: "px-[10px] h-6 text-[0.8125rem]",
      },
      pill: {
        true: "rounded-[10px]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      pill: false,
    },
  }
)

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  // 기존 Badge와 호환성을 위한 props (Table.tsx에서 사용)
  status?: 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
  userRole?: 'admin' | 'moderator' | 'user' | 'guest';
  priority?: 'high' | 'medium' | 'low';
  paymentStatus?: 'paid' | 'pending' | 'failed' | 'refunded';
  primary?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  showIcon?: boolean;
}

function Badge({
  className,
  variant,
  size,
  pill,
  asChild = false,
  status,
  userRole,
  priority,
  paymentStatus,
  primary,
  showIcon = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"
  
  let actualVariant = variant || primary;
  let actualContent = children;

  // status prop 처리
  if (status) {
    switch (status) {
      case 'published':
        actualVariant = 'success';
        actualContent = actualContent || '게시됨';
        break;
      case 'draft':
        actualVariant = 'warning';
        actualContent = actualContent || '임시저장';
        break;
      case 'archived':
        actualVariant = 'secondary';
        actualContent = actualContent || '보관됨';
        break;
      case 'pending':
        actualVariant = 'info';
        actualContent = actualContent || '대기중';
        break;
      case 'rejected':
        actualVariant = 'danger';
        actualContent = actualContent || '거부됨';
        break;
    }
  }

  // userRole prop 처리
  if (userRole) {
    switch (userRole) {
      case 'admin':
        actualVariant = 'danger';
        actualContent = actualContent || '관리자';
        break;
      case 'moderator':
        actualVariant = 'warning';
        actualContent = actualContent || '운영자';
        break;
      case 'user':
        actualVariant = 'primary';
        actualContent = actualContent || '사용자';
        break;
      case 'guest':
        actualVariant = 'secondary';
        actualContent = actualContent || '게스트';
        break;
    }
  }

  // priority prop 처리
  if (priority) {
    switch (priority) {
      case 'high':
        actualVariant = 'danger';
        actualContent = actualContent || '높음';
        break;
      case 'medium':
        actualVariant = 'warning';
        actualContent = actualContent || '보통';
        break;
      case 'low':
        actualVariant = 'info';
        actualContent = actualContent || '낮음';
        break;
    }
  }

  // paymentStatus prop 처리
  if (paymentStatus) {
    switch (paymentStatus) {
      case 'paid':
        actualVariant = 'success';
        actualContent = actualContent || '결제완료';
        break;
      case 'pending':
        actualVariant = 'warning';
        actualContent = actualContent || '결제대기';
        break;
      case 'failed':
        actualVariant = 'danger';
        actualContent = actualContent || '결제실패';
        break;
      case 'refunded':
        actualVariant = 'secondary';
        actualContent = actualContent || '환불됨';
        break;
    }
  }

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant: actualVariant, size, pill }), className)}
      {...props}
    >
      {actualContent}
    </Comp>
  )
}

export { Badge, badgeVariants }
