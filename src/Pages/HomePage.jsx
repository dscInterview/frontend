import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Form validation schema
const schema = Yup.object().shape({
  prompt: Yup.string()
    .required('Prompt is required')
    .max(300, 'Prompt cannot exceed 300 characters'),
});

const HomePage = () => {
  const [generatedImage, setGeneratedImage] = useState(null); // Store generated image
  const [description, setDescription] = useState(''); // Store description

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const mockImage = 'https://via.placeholder.com/400x300'; // Replace with backend image URL
    const mockDescription = `Generated image for: "${data.prompt}"`;

    setGeneratedImage(mockImage);
    setDescription(mockDescription);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      {/* Image Display Section */}
      <div className="flex flex-col items-center w-full max-w-lg">
        {generatedImage ? (
          <>
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-auto object-contain rounded-md border border-gray-300"
            />
            <p className="mt-4 text-center text-gray-700">{description}</p>
          </>
        ) : (
          <div className="w-full h-64 flex items-center justify-center border border-dashed border-gray-400 rounded-md">
            <p className="text-gray-500">No image generated yet</p>
          </div>
        )}
      </div>

      {/* Input Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg flex items-center space-x-4"
      >
        <div className="relative w-full">
          {/* Arrow Icon for focus, initially centered */}
          <FiArrowRight
            size={24}
            className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => document.getElementById('promptInput').focus()}
          />
          
          {/* Input field */}
          <textarea
            {...register('prompt')}
            id="promptInput"
            placeholder="Enter your prompt..."
            rows={1}
            onInput={(e) => {
              e.target.style.height = 'auto';
              const maxHeight = window.innerHeight * 0.2; // Limit to 20% of viewport height
              e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
              if (e.target.scrollHeight > maxHeight) {
                e.target.style.overflowY = 'scroll';
              }
            }}
            className={`w-full px-4 py-3 border ${
              errors.prompt ? 'border-red-500' : 'border-gray-300'
            } rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="p-3 bg-white border border-gray-300 rounded-full hover:shadow-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
        >
          <FiArrowRight className="text-black" size={24} />
        </button>
      </form>

      {/* Error Message */}
      {errors.prompt && (
        <p className="text-red-500 text-sm mt-2">{errors.prompt.message}</p>
      )}
    </div>
  );
};

export default HomePage;
