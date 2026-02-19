"use client";
import { useState } from 'react';
import EmailForm from './EmailForm'
import EmailPreview from './EmailPreview'

const EmailDispatchingSystem = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    description: '',
    message: '',
  });
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm">
            <EmailForm onFormChange={setFormData} />
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <EmailPreview formData={formData} />
          </div>
        </div>
    </>
  )
}

export default EmailDispatchingSystem
