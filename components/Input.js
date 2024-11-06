import { dir } from 'i18next';
const Input = ({
  type,
  leftIcon,
  rightIcon,
  label,
  name,
  value,
  placeholder,
  onChange,
  locale,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-6 text-gray-900`}
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {leftIcon && (
          <div
            className={`${
              dir(locale) === 'rtl' && 'cursor-pointer'
            } absolute inset-y-0 left-0 flex items-center pl-3`}
          >
            {dir(locale) === 'rtl' ? rightIcon : leftIcon}
          </div>
        )}
        <input
          className={`block w-full rounded-md border-0 py-1.5 ${
            leftIcon ? (dir(locale) === 'rtl' ? 'pr-10' : 'pl-10') : null
          } text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-teal sm:text-sm sm:leading-6`}
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {rightIcon && (
          <div
            className={`${
              dir(locale) !== 'rtl' && 'cursor-pointer'
            } absolute inset-y-0 right-0 flex items-center pr-3`}
          >
            {dir(locale) === 'rtl' ? leftIcon : rightIcon}
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
