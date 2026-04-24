"use client";

import { useActionState, useState } from "react";
import { loginAction } from "./action";
import { registerAction } from "../register/action";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [stateLogin, formLoginAction, ispendingLogin] = useActionState(
    loginAction,
    null,
  );
  const [stateRegister, formRegisterAction, ispendingRegister] = useActionState(
    registerAction,
    null,
  );

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center">
      {/* Container */}
      <div className="w-full max-w-md p-8 border border-brand-gold/30 rounded-lg">
        <div className=" text-center mb-8">
          <h3 className="text-brand-gold font-bold">WAVENTRA STUDIO</h3>
          <p className="text-brand-neutral/40">Admin Portal</p>
        </div>
        {/* Toggle Login / Register */}
        <div className="flex mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm ${isLogin ? "text-brand-gold border-b border-brand-gold" : "text-gray-500"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm ${!isLogin ? "text-brand-gold border-b border-brand-gold" : "text-gray-500"}`}
          >
            Register
          </button>
        </div>

        {/* Form — kamu isi sendiri */}
        {isLogin ? (
          <>
            <form action={formLoginAction}>
              {stateLogin?.error && (
                <p className="text-red-500 text-xs mb-2">{stateLogin.error}</p>
              )}
              <div className="text-brand-neutral/30 text-xs mb-4">
                <label htmlFor="email" className="block pb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  placeholder="admin@waventrastudion.com"
                  className="border p-2 rounded-xs w-full bg-brand-primary text-brand-neutral"
                />
              </div>
              <div className="text-brand-neutral/30 text-xs mb-4">
                <label htmlFor="password" className="block pb-2 uppercase">
                  password
                </label>
                <input
                  type="password"
                  required
                  id="password"
                  name="password"
                  placeholder="*********"
                  className="border p-2 rounded-xs w-full bg-brand-primary text-brand-neutral"
                />
              </div>

              <button className="bg-brand-gold w-full rounded-xs py-3 font-bold uppercase">
                {ispendingLogin ? "Loading..." : "Login"}
              </button>
              <p className="text-brand-neutral/30 text-xs text-center pt-2">
                Hanya untuk admin Waventra Studio
              </p>
            </form>
          </>
        ) : (
          <>
            <form action={formRegisterAction}>
              {stateRegister?.error && (
                <p className="text-red-500 text-xs mb-2">
                  {stateRegister.error}
                </p>
              )}
              {stateRegister?.success && (
                <p className="text-green-500 text-xs mb-2">
                  {stateRegister.success}
                </p>
              )}
              <div className="text-brand-neutral/30 text-xs mb-4">
                <label htmlFor="name" className="block pb-2 uppercase">
                  nama
                </label>
                <input
                  type="name"
                  required
                  id="name"
                  name="name"
                  placeholder="admin"
                  className="border p-2 rounded-xs w-full bg-brand-primary text-brand-neutral"
                />
              </div>
              <div className="text-brand-neutral/30 text-xs mb-4">
                <label htmlFor="email" className="block pb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  placeholder="admin@waventrastudion.com"
                  className="border p-2 rounded-xs w-full bg-brand-primary text-brand-neutral"
                />
              </div>
              <div className="text-brand-neutral/30 text-xs mb-4">
                <label htmlFor="password" className="block pb-2 uppercase">
                  password
                </label>
                <input
                  type="password"
                  required
                  id="password"
                  name="password"
                  placeholder="*********"
                  className="border p-2 rounded-xs w-full bg-brand-primary text-brand-neutral"
                />
              </div>

              <button className="bg-brand-gold w-full rounded-xs py-3 font-bold uppercase">
                {ispendingRegister ? "Loading..." : "Register"}
              </button>
              <p className="text-brand-neutral/30 text-xs text-center pt-2">
                Hanya untuk admin Waventra Studio
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
