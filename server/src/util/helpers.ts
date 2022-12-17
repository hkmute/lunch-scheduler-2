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
