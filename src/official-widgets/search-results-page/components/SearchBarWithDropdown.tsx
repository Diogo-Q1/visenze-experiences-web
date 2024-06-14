import type { FC, Key, ReactElement } from 'react';
import { useRef } from 'react';
import { Listbox, ListboxSection, ListboxItem } from '@nextui-org/listbox';
import { Input } from '@nextui-org/input';
import { cn } from '@nextui-org/system';
import MagnifyingGlassIcon from '../../../common/icons/MagnifyingGlassIcon';
import type { ProcessedProduct } from '../../../common/types/product';

/**
 * Component which displays autocomplete suggestions based on search bar input
 */

interface SearchBarWithDropdownProps {
  searchBarValue: string;
  setSearchBarValue: (value: string) => void;
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
  autocompleteResults: string[];
  handleMultisearchWithQuery: (query: string) => void;
  handleMultisearchWithProduct: (product?: ProcessedProduct) => void;
}

const SearchBarWithDropdown: FC<SearchBarWithDropdownProps> = ({ searchBarValue, setSearchBarValue, showDropdown, setShowDropdown, autocompleteResults,
                                         handleMultisearchWithQuery, handleMultisearchWithProduct }): ReactElement => {
  const searchBarInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='relative flex w-full flex-col items-center'>

      {/* Search bar input */}
      <Input
        ref={searchBarInputRef}
        className='z-30'
        classNames={{
          inputWrapper: 'rounded-md bg-white w-full border border-gray-200',
          input: 'text-mobile-searchBarText md:text-tablet-searchBarText lg:text-desktop-searchBarText font-mobile-searchBarText md:font-tablet-searchBarText '
            + 'lg:font-desktop-searchBarText',
        }}
        autoCapitalize='off'
        autoComplete='off'
        size='lg'
        isClearable
        maxLength={500}
        placeholder='What are you looking for?'
        onClick={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleMultisearchWithProduct();
            if (searchBarInputRef.current) {
              searchBarInputRef.current.blur();
            }
          }
        }}
        value={searchBarValue}
        onValueChange={(value) => {
          setSearchBarValue(value);
        }}
        startContent={<MagnifyingGlassIcon className='size-4'/>}
      />

      {/* Autocomplete dropdown */}
      {
        <div className={cn(
          showDropdown && autocompleteResults.length > 0 && searchBarValue !== '' ? 'top-12 h-60' : 'top-6 h-0',
          'absolute w-full transition-height z-20 overflow-hidden rounded-md border-b border-l border-r border-gray-200',
        )}>
          <Listbox
            onAction={(key: Key) => handleMultisearchWithQuery(String(key))}
            className='size-full overflow-auto bg-primary'
          >
            <ListboxSection
              classNames={{
                heading: 'pl-4 text-sm md:text-md lg:text-lg text-primary font-bold',
              }}>
              {autocompleteResults.map((result) => (
                <ListboxItem
                  className='pr-4'
                  key={result}
                  endContent={<MagnifyingGlassIcon className='size-4'/>}
                >
                  <span className='calls-to-action-text pl-2 text-primary'>{result}</span>
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        </div>
      }
    </div>
  );
};
export default SearchBarWithDropdown;
