import { Separator } from "@/components/ui/separator"

const PageContent = ({ title, children }) => {
  return (
    <div className='w-full px-4 md:px-16 py-4 md:py-10 flex flex-col gap-2 items-center'>
      {title && (
        <h1 className='text-2xl text-center'>{title}</h1>
      )}
      <Separator className="my-4" />
      <div className='w-full'>
        {children}
      </div>
    </div>
  )
}

export default PageContent