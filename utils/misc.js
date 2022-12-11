const ROLES = {
  ADMINISTRADOR: 1,
  DOCENTE: 2
};

const findRoleNameById = (id) => {
  if (!id) return '';

  const result = Object.entries(ROLES).find(e => e[1] === id);

  return result[0];
}

module.exports = {
  ROLES,
  findRoleNameById
};