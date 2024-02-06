import TagMenu from '@/features/TagManager/TagMenu';
import TagTable from '@/features/TagManager/TagTable';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import styles from './styles/TagManager.module.css';

export default function TagManager() {
  const [showMenu, setShowMenu] = useState(false);

  let menu;
  if (showMenu) {
    menu = <TagMenu hideMenu={() => setShowMenu(false)} />;
  } else {
    menu = (
      <div
        className={styles['add-task']}
        onClick={() => setShowMenu(true)}
        data-testid="show-menu-button"
      >
        <RiAddLine className={styles['add-task-icon']} />
        Add Tag
      </div>
    );
  }

  return (
    <aside className={styles['tag-manager']}>
      <TagTable />
      {menu}
    </aside>
  );
}
