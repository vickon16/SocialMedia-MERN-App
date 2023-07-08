import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/requests";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/userSlice"
import { useForm } from "react-hook-form";
import FormError from "../../components/FormError"
import Loader from "../../components/Loader";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp({ setIsSignUp }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (mutationData) => signup(mutationData),
    onSuccess: ({data}) => {
      dispatch(loginUser(data))
      navigate("/");
    },
    onError: (err) => {
      setError(err.response.data.message || err.message);
      setTimeout(() =>setError(""), 3000)
    },
  });


  const { username, email, password, confirmPassword } = watch();
  const isDisabled = !username || !email || !password || !confirmPassword || (password !== confirmPassword);

  const onSubmit = (data) => mutate(data);

  return (
    <form
      className="flex_center flex-col gap-5 bg-cardColor rounded px-4 py-8 w-full max-w-lg shadow-sm [&>label>p]:text-customGray"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-[1.7rem] font-semibold webname">Sign Up</h3>

      <label className="w-full">
        <p className="mb-2">Username* </p>
        <input
          type="text"
          placeholder="Username"
          className="input-style"
          {...register("username", { required: "Username is required", minLength : {
            value : 4,
            message  : "Minimum length is 4"
          } })}
        />
      </label>
      <FormError error={errors.username} />

      <label className="w-full">
        <p className="mb-2">Email* </p>
        <input
          type="email"
          placeholder="Email"
          className="input-style"
          {...register("email", { required: "Email is required" })}
        />
      </label>
      <FormError error={errors.email} />

      <div className="flex_between flex-wrap gap-3">
        <label className="w-full sm:flex-[0.49]">
          <p className="mb-2">Password* </p>
          <input
            type="password"
            className="input-style"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              pattern : {
                value : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                message :  "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
              }
            })}
          />
        </label>

        <label className="w-full sm:flex-[0.49]">
          <p className="mb-2">Confirm Password* </p>
          <input
            type="password"
            className="input-style"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
          />
        </label>
        
      </div>

      <FormError error={errors.password} />
      <FormError error={errors.confirmPassword} />

      {/* password error */}
      <span
        className={`${
          password && confirmPassword && password !== confirmPassword
            ? "block"
            : "hidden"
        } text-red-500`}
      >
        Password do not match
      </span>

      {/* error */}
      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="btn-gradient w-[6rem] h-[2rem] self-end mt-4"
        disabled={isDisabled}
      >
        {isLoading ? <Loader size="18" /> : "Sign up"}
      </button>

      <label className="w-full flex_center gap-2">
        <span>Already have an account?</span>
        <button className="text-blue-400" onClick={() => setIsSignUp(false)}>
          Login
        </button>
      </label>
    </form>
  );
}
