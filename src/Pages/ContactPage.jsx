import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup validation schema
const schema = yup.object({
  prompt: yup.string().required('Prompt is required').min(5, 'Prompt should be at least 5 characters')
}).required();

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [promptHeight, setPromptHeight] = useState('120px'); // Initial height to accommodate more text

  const onSubmit = (data) => {
    console.log('Submitted Prompt:', data.prompt); // Log the prompt data to the console
  };

  // Handle the prompt field height increase when button is clicked
  const handlePromptChange = () => {
    setPromptHeight('400px'); // Increase height threshold for more sentences
  };

  return (
    <div className="h-auto flex justify-center items-start bg-transparent"> {/* Adjusted height to 90vh */}
      <div className="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 px-6 py-6 mt-24"> {/* Increased width to sm:w-4/5 */}
        {/* Centered Heading */}
        <h2 className="text-2xl text-white mb-4 font-semibold text-center">What can I help with?</h2>
        
        {/* Form with submit */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4 w-full">
            {/* Textarea Input Field */}
            <textarea
              id="prompt"
              name="prompt"
              placeholder="Enter your prompt..."
              {...register('prompt')}
              className={`w-full p-4 text-white bg-[#191919] rounded-md resize-none focus:outline-none transition-all duration-300 ${promptHeight} ${
                errors.prompt ? 'border-red-500' : ''
              }`}
              style={{
                minHeight: '120px', // Increased the minimum height to show more lines
                maxHeight: '500px',
                overflowY: 'auto',
                transition: 'height 0.3s ease-in-out',
              }}
            />
            
            {/* Paper Plane Icon for Sending */}
            <button
              type="submit" // Changed to submit button
              onClick={handlePromptChange} // Increase height on button click
              className="p-4 border-2 border-transparent text-white rounded-full focus:outline-none transition-all duration-300 hover:border-green-500 hover:shadow-md hover:shadow-green-500/50"
            >
              {/* Paper Plane Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white hover:text-green-500"
              >
                <path d="M21 2L12 13l-3-3-5 5 11 4L21 2z" />
              </svg>
            </button>
          </div>
          
          {/* Error message */}
          {errors.prompt && (
            <p className="text-red-500 text-sm mt-2">{errors.prompt.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
