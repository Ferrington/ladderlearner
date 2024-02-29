import { isNumeric } from '@/utils/isNumeric';
import { useClickOutside } from '@mantine/hooks';
import { ChangeEvent, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';

export type AutocompleteProps = {
  initialState: string;
  changeCheck: (input: string) => boolean;
  filterMatches: (input: string) => string[];
  onClickOutside: () => void;
  onCommit: (input: string) => void;
};

export function useInlineAutocomplete({
  initialState,
  changeCheck,
  filterMatches,
  onClickOutside,
  onCommit,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState(initialState);
  const [matches, setMatches] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [autocomplete, setAutocomplete] = useState('');
  const [width, setWidth] = useState(50);
  const spanRef = useRef<HTMLSpanElement>(null);
  const hiddenRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useClickOutside(onClickOutside);

  useLayoutEffect(() => {
    const maxWidth = Math.max(
      spanRef.current ? spanRef.current.offsetWidth : 0,
      hiddenRef.current ? hiddenRef.current.offsetWidth : 0,
    );

    const minWidth = 50;

    setWidth(Math.max(maxWidth, minWidth));
  }, [inputValue, autocomplete]);

  function handleKeypress(e: KeyboardEvent) {
    if (['ArrowRight', 'Enter', 'Tab'].includes(e.key)) {
      e.preventDefault();

      setAutocomplete('');
      if (matches[selectedMatch] != null) setInputValue(matches[selectedMatch]);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      const newIndex = (selectedMatch + 1) % matches.length;
      setSelectedMatch(newIndex);
      setAutocomplete(formatAutocomplete(inputValue, matches[newIndex]));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      const newIndex = (selectedMatch + matches.length - 1) % matches.length;
      setSelectedMatch(newIndex);
      setAutocomplete(formatAutocomplete(inputValue, matches[newIndex]));
    }

    // submit events
    if (e.key === 'Enter') {
      if (isNumeric(inputValue)) onCommit(inputValue);
      else onCommit(matches[selectedMatch]);
    }

    if (e.key === 'Escape') onClickOutside();
    if (e.key === 'Delete') e.stopPropagation();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedMatch(0);
    const input = e.target.value;
    if (changeCheck(input)) setInputValue(input);

    if (input.length === 0) {
      setAutocomplete('');
      return;
    }

    const newMatches = filterMatches(input);

    setMatches(newMatches);
    const autocomplete = formatAutocomplete(input, newMatches[selectedMatch]);
    setAutocomplete(autocomplete);
  };

  function formatAutocomplete(input: string, match: string) {
    if (match == null) return '';

    return input + match.slice(input.length);
  }

  return {
    wrapperRef,
    hiddenRef,
    spanRef,
    inputValue,
    width,
    handleChange,
    handleKeypress,
    autocomplete,
  };
}
