import { RuleSetTypeEnum } from '@prisma/client'

export interface CreateSpaceDTO {
  name: string
  description: string
  clientsPerSlot: number
  ruleSet: {
    limit: number
    type: RuleSetTypeEnum
  }
}
