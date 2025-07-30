import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

// Modal Component
function SessionModal({ session, isOpen, onClose }) {
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{session.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {session.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

                     {/* Description */}
           {session.description && (
             <div>
               <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                 Description
               </h3>
               <p className="text-gray-800 leading-relaxed">{session.description}</p>
             </div>
           )}

           {/* Session Details */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                 Session ID
               </h3>
               <p className="text-gray-800 font-mono text-sm">{session._id}</p>
             </div>
             
             <div>
               <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                 Session Date
               </h3>
               <p className="text-gray-800">
                 {session.session_date ? new Date(session.session_date).toLocaleDateString('en-US', {
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric'
                 }) : 'Date not set'}
               </p>
             </div>
           </div>

          {/* JSON File Link */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Session Data
            </h3>
            <a
              href={session.json_file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View JSON File
            </a>
          </div>

          {/* Apply for Session Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                // Handle apply for session
                toast.success("Application submitted for session!");
                onClose();
              }}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Apply for Session
            </button>
          </div>

          {/* Additional Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                // Copy session ID to clipboard
                navigator.clipboard.writeText(session._id);
                toast.success("Session ID copied to clipboard!");
              }}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Copy Session ID
            </button>
            <button
              onClick={() => {
                // Copy JSON URL to clipboard
                navigator.clipboard.writeText(session.json_file_url);
                toast.success("JSON URL copied to clipboard!");
              }}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Copy JSON URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/sessions")
      .then((res) => setSessions(res.data))
      .catch(() => toast.error("Failed to load sessions"))
      .finally(() => setLoading(false));
  }, []);

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const SkeletonCard = () => (
    <div className="bg-white shadow-md border rounded-xl p-4 animate-pulse space-y-2">
      <div className="h-5 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-3"></div>
    </div>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="mt-12 text-xl md:text-2xl font-bold mb-6 text-gray-800">🌿 Fitness & Wellness Sessions</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <p className="text-gray-600">No sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
                         <div
               key={session._id}
               className="bg-white shadow-md hover:shadow-lg transition-all duration-200 border rounded-xl p-4 flex flex-col justify-between cursor-pointer transform hover:scale-105"
               onClick={() => handleSessionClick(session)}
             >
               <div>
                 <h2 className="text-xl font-semibold text-gray-800 mb-2">{session.title}</h2>
                 
                 {/* Tags */}
                 <div className="flex flex-wrap gap-1 mb-3">
                   {session.tags.map((tag, index) => (
                     <span
                       key={index}
                       className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
                 
                 {/* Description */}
                 <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                   {session.description || "No description available for this session."}
                 </p>
                 
                                   {/* Session Date */}
                  <p className="text-xs text-gray-500">
                    {session.session_date ? new Date(session.session_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'Date not set'}
                  </p>
               </div>
             </div>
          ))}
        </div>
      )}

      {/* Session Modal */}
      <SessionModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
