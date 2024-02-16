import { useTagMenu } from '@/features/TagManager/hooks/useTagMenu';
import { Button, Select, TextInput } from '@mantine/core';
import styles from '../styles/TagMenu.module.css';

type Props = {
  hideMenu: () => void;
};

export default function TagMenu({ hideMenu }: Props) {
  const { name, error, type, setType, handleNameChange, handleNameKeyPress, createTag } =
    useTagMenu();

  return (
    <div className={styles['tag-menu']} data-testid="tag-menu">
      <TextInput
        size="xs"
        error={error}
        maxLength={30}
        type="text"
        value={name}
        onChange={handleNameChange}
        onKeyDown={handleNameKeyPress}
        placeholder={'Tag Name'}
        data-testid="tag-name"
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
        allowDeselect={false}
        data-testid="tag-type"
      />
      <div className={styles['button-wrapper']}>
        <Button
          classNames={{ label: styles['button-label'] }}
          color="gray.4"
          size="xs"
          onClick={() => hideMenu()}
          data-testid="close-tag-menu-button"
        >
          Cancel
        </Button>
        <Button
          classNames={{ label: styles['button-label'] }}
          color="orange.4"
          size="xs"
          onClick={createTag}
          data-testid="create-tag-button"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
