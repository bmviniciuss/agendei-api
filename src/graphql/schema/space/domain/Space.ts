import { Space as PrismaSpace, SpaceRuleSet } from '@prisma/client'

export type DomainSpace = PrismaSpace & {
  ruleSet: SpaceRuleSet | null
}
