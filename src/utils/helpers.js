export const hasPermission = (permissions, required) => {
  if (!permissions) return false;
  return permissions.includes(required);
};
