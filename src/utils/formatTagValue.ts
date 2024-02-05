import { Tag } from '@/types';

export function formatTagValue(tag: Tag) {
  switch (tag.type) {
    case 'bool':
      return tag.value ? 'True' : 'False';
    case 'number':
      return String(tag.value);
    case 'counter':
      return 'Counter';
    case 'timer':
      return 'Timer';
  }
}
