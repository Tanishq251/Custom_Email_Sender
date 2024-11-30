import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EmailCustomizationPage = () => {
  const location = useLocation();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isContentGenerating, setIsContentGenerating] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [scheduleTime, setScheduleTime] = useState(null); // New state for scheduling

  useEffect(() => {
    if (location.state && location.state.selectedEmails) {
      setSelectedEmails(location.state.selectedEmails);
    }
  }, [location.state]);

  const handleChange = (e) => setPrompt(e.target.value);

  const handleGenerateContent = async () => {
    setIsContentGenerating(true);
    try {
      // Simulate content generation
      setGeneratedContent(`Generated content for: ${prompt}`);
    } catch (error) {
      alert('Error generating email content. Please try again.');
    } finally {
      setIsContentGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const response = await fetch('http://localhost:3001/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: selectedEmails,
          subject: 'Customized Email Content',
          text: generatedContent,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setShowSuccessOverlay(true);
        console.log('Emails sent successfully:', result);
      } else {
        alert('Error sending emails: ' + result.message);
      }
    } catch (error) {
      alert('Error sending emails. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleScheduleEmail = () => {
    if (!scheduleTime) {
      alert('Please select a schedule time.');
      return;
    }

    const delay = scheduleTime.getTime() - new Date().getTime();
    if (delay <= 0) {
      alert('Please select a future time.');
      return;
    }

    setTimeout(() => {
      handleSendEmail();
    }, delay);

    alert('Email scheduled successfully!');
  };

  const handleCloseOverlay = () => {
    setShowSuccessOverlay(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#a0e7e5] p-5">
      <h1 className="text-3xl font-semibold mb-5">Customize Email Content</h1>

      <textarea
        value={prompt}
        onChange={handleChange}
        placeholder="Enter your email prompt with placeholders (e.g., {Company Name})"
        className="p-4 border border-gray-300 rounded-lg w-1/2 h-40 mb-5"
      />

      <motion.button
        onClick={handleGenerateContent}
        className={`px-6 py-2 bg-green-500 text-white rounded-lg ${isContentGenerating ? 'cursor-wait' : ''}`}
        disabled={isContentGenerating}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {isContentGenerating ? 'Generating Content...' : 'Generate Content'}
      </motion.button>

      {generatedContent && (
        <div className="mt-5 w-1/2 p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Generated Email Content</h3>
          <p>{generatedContent}</p>
        </div>
      )}

      {selectedEmails.length > 0 && (
        <div className="mt-5 w-1/2 p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Emails to be Sent:</h3>
          <ul>
            {selectedEmails.map((email, index) => (
              <li key={index} className="text-gray-700">{email}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 w-1/2 p-4 bg-white border border-gray-300 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Schedule Email</h3>
        <DatePicker
          selected={scheduleTime}
          onChange={(date) => setScheduleTime(date)}
          showTimeSelect
          dateFormat="Pp"
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <motion.button
          onClick={handleScheduleEmail}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-3"
          whileHover={{ scale: 1.05 }}
        >
          Schedule Email
        </motion.button>
      </div>

      {showSuccessOverlay && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-500">Success!</h3>
            <p>Emails sent successfully!</p>
            <button
              onClick={handleCloseOverlay}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmailCustomizationPage;
