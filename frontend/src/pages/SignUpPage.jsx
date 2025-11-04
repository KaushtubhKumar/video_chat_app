import React, { useState } from 'react'
import { ShipWheelIcon } from 'lucide-react'
import { Link, Navigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'
import { useNavigate } from 'react-router'
import { signup } from '../lib/api'

function SignUppage() {
  const [signupData, setsignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  
  const queryClient=useQueryClient()

 const {isPending,mutate,error}= useMutation({
   mutationFn:signup,
  onSuccess:()=>{queryClient.invalidateQueries({queryKey:["authUser"]}) }
 })

  const handleSignup = (e) => { 
    e.preventDefault();
    mutate(signupData);
   }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-200' data-theme="forest">
      <div className='border border-primary/35 flex flex-col lg:flex-row w-full max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

        {/* signup form lhs */}
        <div className='w-full lg:w-1/2 p-6 sm:p-8 flex flex-col'>

          {/* logo */}
          <div className='mb-6 flex items-center justify-start gap-2'>
            <ShipWheelIcon className="size-8 text-primary" />
            <span className='text-3xl font-bold text-primary tracking-wide'>
              SHIFTSYNC
            </span>
          </div>

          {/* error messages */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span> 
              </div>
          )}
          
          <div className='w-full'>
            <form onSubmit={handleSignup}>
            <div className='space-y-4'>
              <div>
            <h2 className='text-xl font-semibold'>Create an Account</h2>
            <p className='text-sm opacity-70'>Join ShiftSync absolutely free now</p>
            </div>

            <div className='space-y-3'>
            <div className='form-control w-full'>
              <label className='label'>
              <span className='label-text'>Full Name</span>
              </label>

              <input type='text' placeholder='raand' className='input input-bordered w-full'
              value={signupData.fullName}
              onChange={(e)=>{setsignupData({...signupData,fullName:e.target.value})}}
              required
              />
            </div>

             <div className='form-control w-full'>
              <label className='label'>
              <span className='label-text'>Email</span>
              </label>

              <input type='text' placeholder='john@raaand' className='input input-bordered w-full'
              value={signupData.email}
              onChange={(e)=>{setsignupData({...signupData,email:e.target.value})}}
              required
              />
            </div>

             <div className='form-control w-full'>
              <label className='label'>
              <span className='label-text'>Password</span>
              </label>

              <input type='text' placeholder='***' className='input input-bordered w-full'
              value={signupData.password}
              onChange={(e)=>{setsignupData({...signupData,password:e.target.value})}}
              required
              />
              <p>Password must be atleast 6 characters long</p>
            </div>
      
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                
            </div>
            <button className='btn btn-primary w-full font-bold' type="submit">
              {isPending ?(
                <>
                <span className='loading loading-spinner'>
                Loading...
                </span>
                </>
              ):("CREATE ACCOUNT")} 
            </button>
            <div className='text-center mt-4'>
              <p className='text-sm'>
                Already have an account?{""}
                <Link to="/login" className="text-primary hover:underline">SIGN IN</Link>
              </p>
            </div>
               </div>
             </form>
          </div>
        </div>
       {/* signup form lhs */}
       
       <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-amico.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUppage