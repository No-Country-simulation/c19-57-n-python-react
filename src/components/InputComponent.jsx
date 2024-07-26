import '../App.css'

const InputComponent = ({
  label,
  name,
  placeholder,
  value,
  type,
  handleChange,
  error,
  options,
  disabled
}) => {
  if (type === 'text' || type === 'number' || type === 'password') {
    return (
      <div className='text-start text-lg sm:text-[22px] flex flex-col gap-2 w-full 2xl:w-[714px] px-[18px] md:px-[50px]'>
        <label htmlFor={name} className='font-medium'>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleChange}
          className='rounded-md border-0 p-3.5 my-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
          disabled={disabled ? true : false}
        />
        {error && <p className='mt-2 text-red-600 text-sm'>{error}</p>}
      </div>
    )
  } else if (type === 'select') {
    return (
      <div className='text-start text-lg sm:text-[22px] flex flex-col gap-2 w-full 2xl:w-[714px] px-[18px] md:px-[50px]'>
        <h3 className='font-medium'>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </h3>
        <div className='checkbox-wrapper'>
          {options.map((item) => (
            <label key={item} className='flex items-center gap-2'>
              <input
                type='checkbox'
                name={name}
                value={item}
                checked={value === item}
                onChange={handleChange}
                className='text-indigo-600 focus:ring-indigo-600 !checked:bg-[#f9d7bd]'
              />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          ))}
        </div>
        {error && <p className='mt-2 text-red-600 text-sm'>{error}</p>}
      </div>
    )
  }
}

export default InputComponent
