const TitleComponent = ({ title, color }) => {
  return (
    <div
      className={`w-full flex flex-col text-center items-center justify-center gap-4 ${
        color ? 'bg-green-light' : 'bg-pink-default'
      }  h-[200px] 2xl:h-[388px] rounded-b-2xl mb-5`}
    >
      <h2 className='text-2xl sm:text-3xl 2xl:text-5xl font-semibold'>
        {title}
      </h2>
    </div>
  )
}

export default TitleComponent
