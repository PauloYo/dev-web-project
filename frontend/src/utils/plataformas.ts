export function platformToIcon(platform: string) {
  let result: string;

  switch (platform) {
    case 'playstation':
      result = 'playstation'
      break
    case 'windows':
      result = 'windows'
      break
    case 'xbox':
      result = 'xbox'
      break
    case 'nintendo':
      result = 'nintendo'
      break
    case 'macos':
      result = 'macos'
      break
    case 'linux':
      result = 'linux'
      break
    case 'mobile':
      result = 'mobile'
      break
    default:
      result = 'none'
  }

  return result
}