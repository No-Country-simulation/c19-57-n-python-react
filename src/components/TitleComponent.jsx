const TitleComponent = ({ title }) => {
  return (
    <div className='w-full flex flex-col text-center items-center justify-center gap-4 bg-pink-default h-[200px] rounded-b-2xl mb-5'>
      <h2 className='text-3xl font-semibold'>{title}</h2>
    </div>
  )
}

export default TitleComponent