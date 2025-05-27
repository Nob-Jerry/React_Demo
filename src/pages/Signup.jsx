export default function Signup() {
  return (
   <div className="flex h-auto items-center justify-center bg-blue-100 dark:bg-dark">
      <div className="overflow-hidden">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-blue-100 px-6 py-10 dark:bg-dark sm:p-[60px] shadow-lg">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-slate-600 dark:text-slate-400">
                  Join us for an enhanced experience.
                </p>
                <form>
                  <div className="mb-8">
                    <label htmlFor="name" className="mb-3 block text-sm text-gray-700 dark:text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="email" className="mb-3 block text-sm text-gray-700 dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label htmlFor="password" className="mb-3 block text-sm text-gray-700 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      className="w-full rounded-sm bg-blue-50 px-6 py-3 text-base text-gray-700 outline-none transition-all duration-300 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <button className="flex w-full items-center justify-center rounded-sm bg-blue-500 px-9 py-4 text-base font-medium text-white hover:bg-blue-600">
                      Sign up
                    </button>
                  </div>
                  <button className="mb-6 flex w-full items-center justify-center rounded-sm bg-white px-6 py-3 text-base text-gray-700 shadow hover:bg-blue-50">
                    <span className="mr-3">
                      <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google logo"
                        className="h-6 w-6"
                      />
                    </span>
                    Sign up with Google
                  </button>
                </form>
                <p className="text-center text-base font-medium text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}
