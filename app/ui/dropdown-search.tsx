"use client";
import Downshift from 'downshift';
import { useState } from 'react';

const items:Item[] = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' },
  ];

type Item = {
    value: string;
    label: string;
}

const DropdownSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item|null>(null);

  const handleInputValueChange = (event:any) => {
    setInputValue(event.target.value);
  };

  const handleSelectedItemChange = (item:Item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const renderMenu = () => {
    const filteredItems = items.filter((item) => item.label.includes(inputValue));

    return (
      <ul>
        {filteredItems.map((item) => (
          <li key={item.value}>
            <button onClick={() => handleSelectedItemChange(item)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Downshift
      isOpen={isOpen}
      onInputValueChange={handleInputValueChange}
      
    //   onSelectedItemChange={handleSelectedItemChange}
      itemToString={(item) => item.label}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        selectedItem,
      }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search...',
              value: inputValue,
            })}
          />
          {isOpen && (
            <div {...getMenuProps()}>
              {renderMenu()}
            </div>
          )}
        </div>
      )}
    </Downshift>
  );
};

export default DropdownSearch;
