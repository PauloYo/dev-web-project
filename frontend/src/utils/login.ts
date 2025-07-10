export function isLogged() {
  if (localStorage.getItem('usuarioLogado')) return true

  return false
}