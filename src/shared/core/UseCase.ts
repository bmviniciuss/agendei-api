
export interface UseCase<UseCaseInput, UseCaseResult> {
  execute (data?: UseCaseInput) : Promise<UseCaseResult> | UseCaseResult;
}
