import { selectTags } from '@/store/tag/selectors';
import { addTag } from '@/store/tag/slice';
import { Tag } from '@/types';
import { isNumeric } from '@/utils/isNumeric';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useTagMenu() {
  const tags = useSelector(selectTags);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [type, setType] = useState<string | null>('bool');
  const [error, setError] = useState('');

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setError('');
  }

  function handleNameKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') createTag();
  }

  function createTag() {
    if (name.length === 0) {
      setError('Your tag needs a name.');
      return;
    } else if (isNumeric(name[0])) {
      setError('Tag name cannot start with a number.');
      return;
    } else if (/\W/.test(name)) {
      setError('Tag name can only contain letters, numbers, and underscores.');
      return;
    } else if (name.length > 30) {
      setError('Tag name cannot be longer than 30 characters.');
      return;
    } else if (name in tags) {
      setError('Tag with this name already exists.');
      return;
    }

    dispatch(addTag({ name, type: type as Tag['type'] }));
    setName('');
  }

  return {
    name,
    error,
    type,
    setType,
    handleNameChange,
    handleNameKeyPress,
    createTag,
  };
}
