const buttonStyles = {
  colors: {
    primary: 'bg-[#fde4d1] hover:bg-[#ffd4b3]',
    secondary:
      'bg-[#fff5ee] border-[#fde4d1] border-[1px] hover:bg-[#ffd4b3] border-none',
    disabled: 'bg-[#bfc7cf] hover:bg-[#fff5ee]'
  },
  sizes: {
    small: 'py-1 px-2',
    medium: 'py-2 px-4',
    large: 'py-1 px-4'
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
      className={`h-11 rounded-md px-[100px] sm:px-[147px] 2xl:px-[260.5px] text-blue-darker font-semibold ${colorClass} ${sizeClass} ${textSizeClass}`}
    >
      {text}
    </button>
  )
}

export default Button
