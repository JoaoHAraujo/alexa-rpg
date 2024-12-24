export type TLoginInput = { email: string; password: string };

export interface ILoginUseCase {
  execute(input: TLoginInput): Promise<string>;
}
