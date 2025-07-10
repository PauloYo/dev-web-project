export function platformToIcon(platform: string) {
  let result: string;

  switch (platform) {
    case 'PS4':
      result = 'playstation'
      break
    case 'PC':
      result = 'windows'
      break
    case 'XBOX ONE':
      result = 'xbox'
      break
    case 'NINTENDO SWITCH':
      result = 'nintendo'
      break
    case 'NINTENDO SWITCH 2':
      result = 'nintendo'
      break
    default:
      result = 'none'
  }

  return result
}