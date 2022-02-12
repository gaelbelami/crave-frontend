import React from 'react'
import { ButtonForm } from '../../../components/form-button'

export const Emailtab = () => {
  return (
    <div>
        <div>
                    <div className="border-b border-gray-300">
                     <h2 className=" font-semibold text-xl mb-5 ">Reset Email</h2>
                     
                   </div>
                   <div className="grid gap-3 pt-3">
                     <input type="password" className="input" placeholder="New Email" />
                   </div>
                    <div className=" space-x-2">
                      <ButtonForm actionText="send email" canClick={true} loading={false} />
                      <button className=" py-3 px-3 text-lg font-semibold bg-gray-200 rounded-lg">cancel</button>
                    </div>
                  </div>
    </div>
  )
}
