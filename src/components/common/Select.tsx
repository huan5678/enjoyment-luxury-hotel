import  { ForwardedRef, RefAttributes, forwardRef } from 'react';
import { FormControl, styled, FormHelperText, SxProps, Theme } from '@mui/material';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { Popper as BasePopper } from '@mui/base/Popper';
import {
  Select as BaseSelect,
  selectClasses,
  SelectProps as BaseSelectProps,
  SelectRootSlotProps,
} from '@mui/base/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Select = forwardRef(function Select<TValue extends {}, Multiple extends boolean>(
  props: BaseSelectProps<TValue, Multiple>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const slots: BaseSelectProps<TValue, Multiple>['slots'] = {
    root: CustomButton,
    listbox: DropdownList,
    ...props.slots,
  };
  return <BaseSelect {...props} ref={ref} slots={slots} />;
}) as <TValue extends {}, Multiple extends boolean>(
  props: BaseSelectProps<TValue, Multiple> & RefAttributes<HTMLButtonElement>,
) => JSX.Element;

const Popper = styled(BasePopper)`
  z-index: 1;
`;

const CustomButton = forwardRef(function CustomButton<TValue extends {}, Multiple extends boolean>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;

  return (
    <DropdownButton type="button" {...other} ref={ref}>
      {other.children}
      <KeyboardArrowDownOutlinedIcon />
    </DropdownButton>
  );
});

const DropdownButton = styled('button')(
  ({ theme }) => `
  font-family: ${theme.typography.fontFamily};
  position: relative;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: left;
  line-height: 1.5;
  background: #fff;
  border: 1px solid #ececec;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    border-color: ${theme.palette.primary.main};
  }


  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${theme.palette.primary.dark};
    box-shadow: 0 0 0 3px ${theme.palette.primary.light};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
    origin: 50% 50%;
    transition: transform 0.3s ease;
  }
  &[aria-expanded="true"] {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 0.25rem rgba(190, 156, 124, 0.1);
  & > svg {
      transform: rotate(180deg);
    }
  }
  &[aria-expanded="false"] > svg {
    transform: rotate(0deg);
  }
  `,
);

const DropdownList = styled('ul')(
  ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  max-height: 240px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid ${theme.palette.primary.light};
  color: ${theme.palette.primary.main};
  box-shadow: 0px 2px 4px ${'rgba(0,0,0, 0.05)'};
   /* 捲軸樣式 */
  &::-webkit-scrollbar {
    width: 0.5rem; // 捲軸寬度
  }
  &::-webkit-scrollbar-track {
    background: #F7F2EE; // 捲軸軌道顏色
  }
  &::-webkit-scrollbar-thumb {
    background: #BF9D7D; // 捲軸滑塊顏色
    border-radius: 0.25rem; // 捲軸滑塊圓角
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #7B6651; // 捲軸滑塊懸停顏色
  }
  `,
);

const DropdownListItem = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.dark};
  }

  &.${optionClasses.highlighted} {
    border: 1px solid ${theme.palette.primary.main};
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.dark};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.primary.main};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.dark};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.primary.light};
  }

  &:hover:not(.${optionClasses.disabled}) {
    outline: 1px solid ${theme.palette.primary.main};
    color: ${theme.palette.primary.main};
  }
  `,
);

const Label = styled('label')(
  ({ theme }) => `
  font-family: ${theme.typography.fontFamily};
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: 0.0175rem;
  `,
);

interface SelectProps {
  label: string;
  labelColor?: string;
  options: {
    value: string | number;
    label?: string;
    key?: string;
    content?: React.ReactNode;
  }[];
  error?: boolean;
  placeholder?: string;
  helperText?: string;
  onChange: (value: string | number) => void;
  name: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const StyledSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, labelColor = 'black', options, error, placeholder, helperText, onChange, name, disabled = false, sx },
    ref,
  ) => {
    return (
      <FormControl variant="standard" error={error} sx={{ ...sx, flex: 'auto' }}>
        <Label htmlFor={name} sx={{ color: labelColor }}>
          {label}
        </Label>
        <Select id={name} name={name} defaultValue="" disabled={disabled}>
          <DropdownListItem disabled value="">
            <em>{placeholder}</em>
          </DropdownListItem>
          {options.map((option) => (
            <DropdownListItem
              key={option.key || option.value}
              value={option.value}
              onClick={() => onChange(option.value)}>
              {option.content || option.label}
            </DropdownListItem>
          ))}
        </Select>
        <FormHelperText id={`${name}-helper-text`} error={error} sx={{ paddingTop: '0.5rem' }}>
          {helperText}
        </FormHelperText>
      </FormControl>
    );
  },
);

StyledSelect.displayName = 'Select';

export default StyledSelect;
