export function parseTagName(tagName: string): { name: string; key?: string } {
  if (tagName.includes('.')) {
    const [name, key] = tagName.split('.');
    return { name, key };
  }
  return { name: tagName };
}
