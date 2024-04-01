import { FileTextIcon } from 'lucide-react'

export const PageIcon = ({ image }: { image: string | undefined }) => {
  return image ? (
    <img src={image} alt="" className="object-cover h-10 w-10 rounded flex-shrink-0" />
  ) : (
    <div className="h-10 w-10 bg-background rounded flex items-center justify-center text-white flex-shrink-0">
      <FileTextIcon className="w-4 h-4" />
    </div>
  )
}
