export type TLoginInput = { email: string; password: string };
export type TLoginOutput = { token: string };

export interface ILoginUseCase {
  execute(input: TLoginInput): Promise<TLoginOutput>;
}
