import React from 'react'

const Error_page = () => {
  return (
    <>
      <div className="w-full min-h-screen place-items-center py-48 text-center">
        <p className="text-3xl font-semibold text-gray-600">404</p>
        <p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"> Page not found </p>
        <p className="mt-6 text-base leading-7 text-gray-600"> Sorry, we couldn’t find the page you’re looking for. </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/product_page" className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Go back home
          </a>
        </div>
      </div>
    </>
  )
}

export default Error_page