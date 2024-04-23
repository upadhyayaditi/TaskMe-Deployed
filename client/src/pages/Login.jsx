import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Textbox from "../components/Textbox"
import Button from "../components/Button"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../redux/slices/api/authApiSlice"
import { toast } from "sonner"

import { setCredentials } from "../redux/slices/authSlice"
import Loading from "../components/Loader"

const Login = () => {
    const [demoCredentials, setDemoCredentials] = useState({
        email: "user@gmail.com",
        password: "123456",
    })

    const [showDemo, setShowDemo] = useState(true) // State to control the visibility of demo credentials

    const { user } = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()

    const handleOkClick = () => {
        setShowDemo(false) // Hide demo credentials
    }

    const submitHandler = async (data) => {
        try {
            const result = await login(data).unwrap()

            dispatch(setCredentials(result))

            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.message)
        }
    }

    useEffect(() => {
        user && navigate("/dashboard")
    }, [user])

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
            <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
                {/* left side */}
                <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
                    <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
                        <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
                            Manage all your task in one place!
                        </span>
                        <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
                            <span>Cloud-Based</span>
                            <span>Task Manager</span>
                        </p>

                        <div className="cell">
                            <div className="circle rotate-in-up-left"></div>
                        </div>
                    </div>
                </div>

                {/* right side */}

                <div className="w-full md:w-1/2 p-4 md:p-1 flex flex-col justify-center items-center">
                    {showDemo && (
                        <div
                            className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-3"
                            role="alert"
                        >
                            <div className="flex justify-between items-center">
                                {" "}
                                {/* Updated flex class */}
                                <div className="py-1">
                                    <svg
                                        className="fill-current h-6 w-6 text-blue-500 mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2.727 0A2.73 2.73 0 0 0 0 2.727v14.546A2.73 2.73 0 0 0 2.727 20h14.546A2.73 2.73 0 0 0 20 17.273V2.727A2.73 2.73 0 0 0 17.273 0H2.727zM1 2.727a.727.727 0 0 1 .727-.727h16.546a.727.727 0 0 1 .727.727v14.546a.727.727 0 0 1-.727.727H1.727A.727.727 0 0 1 1 17.273V2.727zm11 4h-2V4h2v3zm0 4h-2V8h2v3zm-4-4H6V4h2v3zm0 4H6V8h2v3zm0 4H6v-3h2v3zm-4-4H2V8h1v3zm0 4H2v-3h1v3zm0 4H2v-3h1v3zm9 0h-2v-3h2v3zm0-4h-2v-3h2v3zm0-4h-2V8h2v3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">
                                        Demo admin log-in credentials:
                                    </p>
                                    <p>
                                        Email:{" "}
                                        <strong>{demoCredentials.email}</strong>
                                    </p>
                                    <p>
                                        Password:{" "}
                                        <strong>
                                            {demoCredentials.password}
                                        </strong>
                                    </p>
                                </div>
                                <button
                                    onClick={handleOkClick}
                                    className="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
                    >
                        <div className="">
                            <p className="text-blue-600 text-3xl font-bold text-center">
                                Welcome back!
                            </p>
                            <p className="text-center text-base text-gray-700 ">
                                Keep all your credentials safe.
                            </p>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <Textbox
                                placeholder="email@example.com"
                                type="email"
                                name="email"
                                label="Email Address"
                                className="w-full rounded-full"
                                register={register("email", {
                                    required: "Email Address is required!",
                                })}
                                error={errors.email ? errors.email.message : ""}
                            />
                            <Textbox
                                placeholder="your password"
                                type="password"
                                name="password"
                                label="Password"
                                className="w-full rounded-full"
                                register={register("password", {
                                    required: "Password is required!",
                                })}
                                error={
                                    errors.password
                                        ? errors.password.message
                                        : ""
                                }
                            />

                            <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                                Forget Password?
                            </span>

                            {isLoading ? (
                                <Loading />
                            ) : (
                                <Button
                                    type="submit"
                                    label="Submit"
                                    className="w-full h-10 bg-blue-700 text-white rounded-full"
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
