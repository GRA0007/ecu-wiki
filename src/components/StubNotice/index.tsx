import Link from 'next/link'

export const StubNotice = () => {
  return (
    <div className="border rounded px-4 py-3">
      <h2 className="font-heading text-xl font-bold mb-1">This page is a stub</h2>
      <p className="text-sm">
        You can help improve it by <Link href="#">editing this page</Link>.
      </p>
    </div>
  )
}
