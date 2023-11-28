import { TextInput } from '@tremor/react';
import { useEffect, useRef, useState } from 'react';

export const SearchBox = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}: {
  options: any;
  label: any;
  id: any;
  selectedVal: any;
  handleChange: any;
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = (option: any) => {
    setQuery(() => '');
    handleChange(option[label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e: any) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return '';
  };

  const filter = (options: any) => {
    return options.filter(
      (option: any) =>
        option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className='dropdown'>
      <div className='control'>
        <div className='selected-value '>
          <TextInput
            placeholder='Search...'
            ref={inputRef}
            type='text'
            value={getDisplayValue()}
            name='searchTerm'
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
          <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      <div className={`options ${isOpen ? 'open' : ''}`}>
        {/* {filter(options).map((option: any, index: any) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option[label] === selectedVal ? 'selected' : ''
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
