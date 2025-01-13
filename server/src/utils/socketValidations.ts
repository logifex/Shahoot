import ValidationError from "../errors/ValidationError";

const MAX_NICKNAME_LENGTH = 20;

export function validatePin(pin: unknown): asserts pin is string {
  if (typeof pin !== "string") {
    throw new ValidationError(undefined, "Invalid PIN code");
  }
}

export function validateNickname(
  nickname: unknown
): asserts nickname is string {
  if (
    typeof nickname !== "string" ||
    nickname.length === 0 ||
    nickname.length > MAX_NICKNAME_LENGTH
  ) {
    throw new ValidationError(undefined, "Invalid nickname");
  }
}

export function validateAnswerIndex(
  index: unknown,
  length: number
): asserts index is number {
  if (typeof index !== "number" || index < 0 || index > length - 1) {
    throw new ValidationError(undefined, "Invalid question index");
  }
}
