-- CreateTable
CREATE TABLE "SpaceRuleSet" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,

    CONSTRAINT "SpaceRuleSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpaceRuleSet_spaceId_key" ON "SpaceRuleSet"("spaceId");

-- AddForeignKey
ALTER TABLE "SpaceRuleSet" ADD CONSTRAINT "SpaceRuleSet_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
