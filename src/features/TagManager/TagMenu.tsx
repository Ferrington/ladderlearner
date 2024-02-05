import { Button, Select, TextInput } from '@mantine/core';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './styles/TagMenu.module.css';

type Props = {
  hideMenu: () => void;
};

export default function TagMenu({ hideMenu }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<string | null>('bool');
  const [error, setError] = useState('');

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setError('');
  }

  function handleNameKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') addTag();
  }

  function addTag() {
    if (name === '') return;

    // add to tag state
    console.log(name);
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
          onClick={addTag}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
