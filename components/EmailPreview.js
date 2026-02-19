"use client";
export default function EmailPreview({ formData }) {
  const {
    firstName = '',
    lastName = '',
    email = '',
    subject = '',
    description = '',
    message = '',
  } = formData;

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="h-full overflow-y-auto bg-[#0b0f14] p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-6 text-white">
        Email Preview
      </h2>

      <div className="bg-[#111827] border border-[#1f2937] rounded-xl shadow-lg overflow-hidden">

        <div className="bg-[#0b1220] border-b border-[#1f2937] p-6 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Company Logo"
            className="h-14 object-contain"
          />
        </div>

        <div className="p-8">

          <div className="mb-5 flex gap-3 bg-[#0b1220] border border-[#1f2937] rounded-lg p-4">
            <span className="text-sm font-semibold text-green-400">
              Subject
            </span>
            <span className="text-sm text-gray-200 wrap-break-word">
              {subject || 'No subject provided'}
            </span>
          </div>

          <div className="mb-6 bg-[#0b1220] border border-[#1f2937] rounded-lg p-4 text-sm">
            <p className="text-gray-300">
              <span className="text-gray-400">To:</span>{' '}
              {email || 'No email provided'}
            </p>
            {fullName && (
              <p className="text-gray-300 mt-1">
                <span className="text-gray-400">Name:</span>{' '}
                {fullName}
              </p>
            )}
          </div>

          <div className="h-px bg-[#1f2937] my-6" />

          <div className="text-sm">

            {fullName && (
              <p className="text-gray-200 mb-4">
                Dear <span className="text-green-400">{fullName}</span>,
              </p>
            )}

            {description && (
              <div className="mb-6">
                <p className="text-green-400 font-semibold mb-2">
                  Overview
                </p>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap wrap-break-word">
                  {description}
                </p>
              </div>
            )}

            {message && (
              <div className="mb-6">
                <p className="text-green-400 font-semibold mb-2">
                  Message
                </p>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap wrap-break-word">
                  {message}
                </p>
              </div>
            )}

            <div className="mt-8 pt-5 border-t border-[#1f2937]">
              <p className="text-gray-400">Best regards,</p>
              <p className="text-gray-300 font-medium mt-1">
                AnimeKai Team
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#1f2937] text-center">
            <p className="text-xs text-gray-500">
              &copy; 2024 AnimeKai. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

