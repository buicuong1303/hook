import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
FilterForm.propTypes = {
  onSubmit: PropTypes.func,
};
FilterForm.defaultProps = {
  onSubmit: null,
};
function FilterForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null);
  function handleChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    if (!onSubmit) return;

    // SET -- 100 -- CLEAR, SET -- 300 --> SUBMIT
    // SET -- 300 --> SUBMIT
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300);
  }
  return (
    <div>
      <InputGroup size="sm">
        <InputGroupAddon addonType="prepend">@sm</InputGroupAddon>
        <Input onChange={handleChange} />
      </InputGroup>
    </div>
  );
}

export default FilterForm;
