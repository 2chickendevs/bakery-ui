import './style.scss';

import { useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function Filter(props) {
  const [dropdownValue, setDropdownValue] = useState(undefined);

  const [searchValue, setSearchValue] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(undefined);

  const searchOnChange = (event) => {
    typingTimeout && clearTimeout(typingTimeout);
    const value = event.target.value;
    setSearchValue(value);

    setTypingTimeout(
      setTimeout(() => {
        props.seachCallback(value);
      }, 500)
    );
  };

  const onDropdownChange = (e) => {
    const data = e.value;
    setDropdownValue(data);
    props.onDropdownChange(data);
  };

  return (
    <div className="filter-container">
      <InputText value={searchValue} onChange={searchOnChange} placeholder={'Search...'} />

      {props.showDropdown && (
        <Dropdown
          value={dropdownValue}
          onChange={onDropdownChange}
          options={props.dropdownValue}
          optionLabel="name"
          placeholder={props.dropdownPlaceHolder}
          filter={true}
          showClear={dropdownValue}
        />
      )}

      <Button label={props.buttonTitle} onClick={props.buttonOnClick} size="small" />
    </div>
  );
}
