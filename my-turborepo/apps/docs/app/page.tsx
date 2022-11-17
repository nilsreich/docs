export default function Page() {
  return (
    <div className="grid h-screen grid-cols-12 content-start bg-black text-neutral-500">
  <div className="col-span-full pt-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-4 h-6 w-6 text-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </div>
  <div className="col-span-2 pt-4">
    <div className="mx-4 mb-4 flex max-w-full">
      <input type="text" placeholder="Search" className="w-full border border-neutral-900 bg-transparent px-1 py-1 italic placeholder:text-neutral-700" />
    </div>
    <div className="mx-4 rounded px-3 py-1 font-semibold text-white">Introduction</div>
    <div className="mx-4 ml-8 mt-1 rounded bg-neutral-900 px-3 py-1 font-semibold text-white">What ist this</div>
    <div className="mx-4 ml-8 mt-1 rounded px-3 py-1">Go for it</div>
    <div className="mx-4 ml-8 mt-1 rounded px-3 py-1">Read more</div>
    <div className="mx-4 mt-1 px-3 py-1">Getting Started</div>
    <div className="mx-4 mt-1 px-3 py-1">Databases</div>
    <div className="mx-4 mt-1 px-3 py-1">Components</div>
    <div className="mx-4 mt-1 px-3 py-1">Math</div>
  </div>
  <div className="col-span-10 mx-auto max-w-6xl p-2">
    <div className="h-80 rounded-3xl bg-gradient-to-br from-purple-900 to-black px-10 pt-5 text-6xl text-white">What is this</div>
    <div className="leading-7 text-neutral-300">This is a presentation site for rollup fancz teext even working for a little bit even get whatever to make that personal projects happen zou have to make sacrifies. For a very long</div>
  </div>
</div>

  )
}
