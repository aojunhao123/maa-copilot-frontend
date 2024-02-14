import { Divider, H3, Icon, IconName, MaybeElement } from '@blueprintjs/core'

import clsx from 'clsx'
import { ReactNode } from 'react'

interface SheetContainerSkeletonProps {
  title: string
  icon: IconName | MaybeElement
  mini?: boolean
  className?: string
  rightOptions?: ReactNode
  children: ReactNode
}

export const SheetContainerSkeleton = ({
  title,
  icon,
  children,
  mini,
  rightOptions,
  className,
}: SheetContainerSkeletonProps) => (
  <section className={className}>
    <header className={clsx('flex items-center pl-3', mini ? 'my-1' : 'my-5')}>
      <Icon icon={icon} size={mini ? 16 : 20} />
      <H3 className={clsx('p-0 m-0 ml-3 truncate', mini && '!text-lg')}>
        {title}
      </H3>
      {rightOptions}
    </header>
    {!mini && <Divider />}
    {children}
  </section>
)
