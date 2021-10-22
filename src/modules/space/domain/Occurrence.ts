import { EventTypeEnum } from '@prisma/client'

export interface DomainOccurrence {
  id: string
  parentId: string
  title: string
  description: string
  duration: number
  slots: number
  type: EventTypeEnum
  active: boolean
  isParentEvent: boolean
  isCanceled: boolean
  isRescheduled: boolean
  date: string
  createdAt: Date;
  updatedAt: Date;
}
