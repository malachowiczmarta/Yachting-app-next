import { useRef, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignIn() {
  const loginForm = useRef<HTMLFormElement>(null);
  const [error, setError] = useState('');
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formProcessing) return;
    setError('');
    setFormProcessing(true);
    const form = new FormData(loginForm.current as HTMLFormElement);
    const resp = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    if (resp?.ok) {
      router.push('/');
    } else {
      setError('Not authorized. Try again.');
      setFormProcessing(false);
    }
  };

  return (
    <BaseLayout>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Sign in
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form className="flex flex-wrap -m-2" ref={loginForm} onSubmit={handleSubmit}>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  disabled={formProcessing}
                  className="disabled:opacity-50 flex mx-auto text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                >
                  {formProcessing ? 'Please wait...' : 'Login'}
                </button>

                {error && (
                  <div className="flex justify-center w-full my-5">
                    <span className="bg-red-600 w-full rounded text-white px-3 py-3 text-center">
                      {error}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-2 w-full">
                <p className="text-center">
                  Don't have an account?{' '}
                  <Link
                    href="/user/register"
                    className="text-teal-500 inline-flex items-center mt-4"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="p-2 w-full">
                <p className="text-center">
                  <Link
                    href="/user/resetPassword"
                    className="text-teal-500 inline-flex items-center mt-4"
                  >
                    Forgot password?
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
