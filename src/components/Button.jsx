const buttonStyles = {
  colors: {
    primary: 'bg-[#fde4d1] hover:bg-[#ffd4b3]',
    secondary:
      'bg-[#fff5ee] border-[#fde4d1] border-[1px] hover:bg-[#ffd4b3] border-none',
    disabled: 'bg-[#bfc7cf] hover:bg-[#fff5ee]'
  },
  sizes: {
    small: 'py-1 px-[100px] sm:px-[147px] 2xl:px-[260.5px]',
    medium: 'py-2 px-[100px] sm:px-[147px] 2xl:px-[260.5px]',
    large: 'py-2 px-[100px] sm:px-[147px] 2xl:px-[260.5px]',
    login: 'py-2 w-full'
  },
  textSizes: {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl'
  }
}

const Button = ({ textSize, color, size, text, type }) => {
  const colorClass = buttonStyles.colors[color] || ''
  const sizeClass = buttonStyles.sizes[size] || ''
  const textSizeClass = buttonStyles.textSizes[textSize] || ''

  return (
    <button
      type={type}
      className={`h-11 rounded-md text-blue-darker font-semibold ${colorClass} ${sizeClass} ${textSizeClass}`}
    >
      {text}
    </button>
  )
}

export default Button
