import { selectTagValueById } from '@/store/tag/selectors';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import styles from '../styles/InstructionBox.module.css';

type Props = {
  tagId: string;
};

export default function TagPreview({ tagId }: Props) {
  return (
    <p className={clsx('instruct-value', styles['instruct-value'], styles['tag-preview'])}>
      {useSelector(selectTagValueById(tagId)) as number}
    </p>
  );
}
