import { FeatherIcon } from 'lucide-react'
import Link from 'next/link'

export const StubNotice = ({ editUrl }: { editUrl: string }) => {
  return (
    <div className="border rounded px-4 py-3 flex items-start gap-4">
      <FeatherIcon className="h-4 w-4 relative top-1.5 flex-shrink-0" />
      <div>
        <span className="font-heading text-xl font-bold mb-1">This page is a stub</span>
        <p className="text-sm">
          You can help improve it by{' '}
          <Link href={editUrl} rel="noreferrer nofollow" className="underline">
            editing this page
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
