// Implementar isso

// Verificar se tem permissão na empresa requisita em req.params;

const { companyId } = req.params;

// Verificar se aquele usuário é o owner

// Atribuir uma permissão
req.authorized = { companyId, userId: req.userId, role: admin / user, etc };

next();
