export default function Login () {
  return (
  <div className="flex h-auto items-center justify-center bg-blue-100 dark:bg-dark">
    <div className=" overflow-hidden ">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded bg-blue-100 px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Sign in to your account
              </h3>
              <p className="mb-11 text-center text-base font-medium text-slate-600 dark:text-slate-400">
                Login to your account for a faster checkout.
              </p>
              <form>
                <div className="mb-8">
                  <label htmlFor="email" className="mb-3 block text-sm text-gray-700 dark:text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="password" className="mb-3 block text-sm text-gray-700 dark:text-white">
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-white">
                      <input
                        type="checkbox"
                        className="mr-2 h-5 w-5 rounded border border-gray-300 bg-white text-blue-600 focus:ring-0"
                      />
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="#0" className="text-sm font-medium text-blue-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="mb-6">
                  <button className="flex w-full items-center justify-center rounded-sm bg-blue-500 px-9 py-4 text-base font-medium text-white hover:bg-blue-600">
                    Sign in
                  </button>
                </div>
                <button className="mb-6 flex w-full items-center justify-center rounded-sm bg-white px-6 py-3 text-base text-gray-700 shadow hover:bg-blue-50">
                  <span className="mr-3">
                    <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google logo"
                    className="h-6 w-6"
                  />
                  </span>Sign in with Google
                </button>
              </form>
              <p className="text-center text-base font-medium text-gray-600">
                Don’t you have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};