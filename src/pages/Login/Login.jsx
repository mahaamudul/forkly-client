import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { AUthContext } from "../../provider/AuthProvider";
import Swal from "../../utils/alertTheme";
import authVisual from "../../assets/home/featured.jpg";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signIn, ensureAccessToken } = useContext(AUthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signIn(email, password)
      .then(async (result) => {
        if (result.user) {
          await ensureAccessToken(result.user.email);
          Swal.fire({
            title: "Welcome back",
            text: "Your table, cart, and reservations are ready.",
            icon: "success",
          });
        }
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          title: "Sign in failed",
          text: err.message,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign In</title>
      </Helmet>

      <section className="min-h-screen bg-[#f8f5f0] px-[10px] py-24">
        <div className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-6xl overflow-hidden rounded-lg border border-[#e8dccb] bg-white shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className="relative flex min-h-[320px] items-end overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(23,23,23,0.15), rgba(23,23,23,0.72)), url(${authVisual})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,146,60,0.18),rgba(23,23,23,0))]" />
            <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 text-white lg:p-12">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Bistro Boss"
                  className="h-11 w-11 rounded-full border border-white/40 object-cover"
                />
                <div>
                  <p className="font-cinzel text-xl font-bold uppercase tracking-[0.2em]">
                    Bistro Boss
                  </p>
                  <p className="text-sm text-white/80">
                    Modern dining, warm service
                  </p>
                </div>
              </div>

              <div className="max-w-xl">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-200">
                  Guest access
                </p>
                <h1 className="font-cinzel text-4xl font-bold leading-tight lg:text-5xl">
                  Return to your table with one simple sign in.
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 lg:text-base">
                  Manage reservations, continue your order, and keep your Bistro
                  Boss experience moving without friction.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-white">
            <div className="w-full p-6 sm:p-8 lg:p-12">
              <div className="mx-auto max-w-md">
                <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                  Sign in
                </p>
                <h2 className="mt-3 font-cinzel text-3xl font-bold text-neutral">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use your Bistro Boss account to pick up where you left off.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="guest@bistroboss.com"
                      className="input h-12 w-full rounded-md border-[#d9c8b4] bg-[#fffdf9] focus:border-orange-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-medium text-neutral">
                        Password
                      </label>
                      <span className="text-xs text-slate-500">
                        Secure account access
                      </span>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="input h-12 w-full rounded-md border-[#d9c8b4] bg-[#fffdf9] focus:border-orange-400 focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn h-12 w-full rounded-md border-0 bg-orange-400 text-base font-semibold text-neutral hover:bg-orange-500"
                  >
                    Sign In
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#eadfce]" />
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    or continue with
                  </span>
                  <div className="h-px flex-1 bg-[#eadfce]" />
                </div>

                <SocialLogin />

                <p className="mt-6 text-sm text-slate-600">
                  New to Bistro Boss?{" "}
                  <Link
                    to="/signUp"
                    className="font-semibold text-orange-500 hover:text-orange-600"
                  >
                    Create your account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
