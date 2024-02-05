import { selectTags } from '@/store/tag/tagSelectors';
import { addTag } from '@/store/tag/tagSlice';
import { Tag } from '@/types';
import { isNumeric } from '@/utils/isNumeric';
import { Button, Select, TextInput } from '@mantine/core';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/TagMenu.module.css';

type Props = {
  hideMenu: () => void;
};

export default function TagMenu({ hideMenu }: Props) {
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

  return (
    <div className={styles['tag-menu']}>
      <TextInput
        size="xs"
        error={error}
        maxLength={30}
        type="text"
        value={name}
        onChange={handleNameChange}
        onKeyDown={handleNameKeyPress}
        placeholder={'Tag Name'}
      />
      <Select
        onChange={setType}
        size="xs"
        data={[
          { value: 'bool', label: 'Boolean' },
          { value: 'number', label: 'Number' },
          { value: 'counter', label: 'Counter' },
          { value: 'timer', label: 'Timer' },
        ]}
        value={type}
      />
      <div className={styles['button-wrapper']}>
        <Button
          classNames={{ label: styles['button-label'] }}
          color="gray.4"
          size="xs"
          onClick={() => hideMenu()}
        >
          Cancel
        </Button>
        <Button
          classNames={{ label: styles['button-label'] }}
          color="orange.4"
          size="xs"
          onClick={createTag}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
