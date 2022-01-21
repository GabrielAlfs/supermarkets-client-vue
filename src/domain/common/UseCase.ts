export interface IUseCase<TUseCaseData, TUseCaseReturn> {
  execute(data?: TUseCaseData): Promise<TUseCaseReturn>;
}
