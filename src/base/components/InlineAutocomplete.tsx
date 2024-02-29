import { AutocompleteProps, useInlineAutocomplete } from '@/base/hooks/useInlineAutocomplete';
import styles from '../styles/InlineAutocomplete.module.css';

export default function InlineAutocomplete(props: AutocompleteProps) {
  const {
    wrapperRef,
    hiddenRef,
    spanRef,
    inputValue,
    width,
    handleChange,
    handleKeypress,
    autocomplete,
  } = useInlineAutocomplete(props);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div>
        <span className={styles['hidden-span']} ref={hiddenRef}>
          {inputValue}
        </span>
        <input
          autoFocus
          name="inline-autocomplete"
          maxLength={30}
          type="text"
          style={{ width }}
          value={inputValue}
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          onKeyDown={handleKeypress}
          onClick={(e) => e.stopPropagation()}
          data-testid="inline-autocomplete"
        />
        <span ref={spanRef} className={styles.overlay}>
          {autocomplete}
        </span>
      </div>
    </div>
  );
}
