import AppError from "./error/AppError";

export const newEntity = <T>(
  Entity: { new (): T },
  data: Partial<Record<keyof T, any>>
) => {
  const instance = new Entity();
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    instance[key] = data[key];
  }
  return instance;
};

export const validateReq = (
  nameSpace: string,
  data: any,
  type: "string" | "number" | "array",
  checker?: (data: any) => boolean
) => {
  if (type === "array" && !Array.isArray(data)) {
    throw new AppError(`Invalid ${nameSpace}`, 400);
  }
  if (type === "number" && Number.isNaN(data)) {
    throw new AppError(`Invalid ${nameSpace}`, 400);
  }
  if (type !== "array" && typeof data !== type) {
    throw new AppError(`Invalid ${nameSpace}`, 400);
  }
  if (checker && !checker(data)) {
    throw new AppError(`Invalid ${nameSpace}`, 400);
  }
  return true;
};

type Option = { id?: number; name: string };
export const preprocessOptions = (options: Option[]) => {
  const optionsWithId: Option[] = [];
  const optionsToInsert: Option[] = [];
  if (!options) {
    return { optionsWithId, optionsToInsert };
  }
  options.forEach((option) => {
    if (option.id) {
      return optionsWithId.push(option);
    }
    return optionsToInsert.push(option);
  });
  return { optionsWithId, optionsToInsert };
};

export const getPaginationParams = (query: Record<string, any>) => {
  const limit = parseInt(query.limit ?? 10);
  const offset = parseInt(query.offset ?? 0);
  validateReq("limit", limit, "number");
  validateReq("offset", offset, "number");
  return { limit, offset };
};

export const sanitizeOwner = (data: Record<string, any>, userId: number) => {
  const { owner, ...rest } = data;
  return { ...rest, isOwner: owner?.id === userId };
};
