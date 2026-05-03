import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AUthContext } from "../../provider/AuthProvider";
import Swal from "../../utils/alertTheme";
import authVisual from "../../assets/home/chef-service.jpg";
import logo from "../../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, userUpdateProfile, ensureAccessToken } = useContext(AUthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photoURL } = data;
    const userInfo = { name, email, photoURL };

    try {
      const result = await createUser(email, password);
      if (!result.user) return;

      await userUpdateProfile(name, photoURL);
      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId || res.data.message === "user already exists") {
        await ensureAccessToken(email);
        Swal.fire({
          title: "Account created",
          text: "Your Forkly profile is ready for orders and reservations.",
          icon: "success",
        });
        reset();
        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        title: "Sign up failed",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Forkly | Sign Up</title>
      </Helmet>

      <section className="min-h-screen bg-[#f8f5f0] py-24">
        <div className="content-shell">
          <div className="grid min-h-[calc(100vh-12rem)] overflow-hidden rounded-lg border border-[#e8dccb] bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex items-center bg-white">
            <div className="w-full p-6 sm:p-8 lg:p-12">
              <div className="mx-auto max-w-md">
                <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                  Join Forkly
                </p>
                <h1 className="mt-3 text-3xl font-bold text-neutral">
                  Create your guest account
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Save your details once and keep ordering, paying, and booking
                  with a smoother dining flow.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="input h-12 w-full rounded-md border-[#d9c8b4] bg-[#fffdf9] focus:border-orange-400 focus:outline-none"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500">Name is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral">
                      Profile photo URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/profile.jpg"
                      className="input h-12 w-full rounded-md border-[#d9c8b4] bg-[#fffdf9] focus:border-orange-400 focus:outline-none"
                      {...register("photoURL", { required: true })}
                    />
                    {errors.photoURL && (
                      <p className="mt-2 text-sm text-red-500">
                        Profile photo URL is required.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="guest@forkly.com"
                      className="input h-12 w-full rounded-md border-[#d9c8b4] bg-[#fffdf9] focus:border-orange-400 focus:outline-none"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">Email is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a secure password"
                      className="input h-12 w-full rounded-md border-[#d9c8b4] bg-[#fffdf9] focus:border-orange-400 focus:outline-none"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).*$/,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="mt-2 text-sm text-red-500">Password is required.</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="mt-2 text-sm text-red-500">
                        Password must be at least 6 characters.
                      </p>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <p className="mt-2 text-sm text-red-500">
                        Password must stay within 20 characters.
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="mt-2 text-sm text-red-500">
                        Use 2 uppercase letters, 1 lowercase letter, 1 number,
                        and 1 special character.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn h-12 w-full rounded-md border-0 bg-orange-400 text-base font-semibold text-neutral hover:bg-orange-500"
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
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
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-orange-500 hover:text-orange-600"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative flex min-h-[320px] items-end overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(23,23,23,0.18), rgba(23,23,23,0.75)), url(${authVisual})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(251,146,60,0.2),rgba(23,23,23,0))]" />
            <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 text-white lg:p-12">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Forkly"
                  className="h-11 w-11 rounded-full border border-white/40 object-cover"
                />
                <div>
                  <p className="text-xl font-bold uppercase tracking-[0.2em]">
                    Forkly
                  </p>
                  <p className="text-sm text-white/80">
                    Crafted meals, thoughtful hosting
                  </p>
                </div>
              </div>

              <div className="max-w-xl">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-200">
                  Dining membership
                </p>
                <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                  Make every next visit easier to book and enjoy.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 lg:text-base">
                  One account keeps your orders, payments, and reservations in
                  one calm place built around the Forkly experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Register;
