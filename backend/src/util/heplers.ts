import prismaDB from "./db";

export const isUniqueEmail = async (val: string) => {
  const result = await prismaDB.profile.findUnique({ where: { email: val } });
  return result;
};
