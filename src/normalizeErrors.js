// [{path: 'email', message: 'does not exist'}]
/**
 * {
 *  email: ['error1', 'error2', ...]
 * }
 */
export default errors =>
  errors.reduce((acc, cur) => {
    if (cur.path in acc) {
      acc[cur.path].push(cur.message);
    } else {
      acc[cur.path] = [cur.message];
    }

    return acc;
  }, {});
