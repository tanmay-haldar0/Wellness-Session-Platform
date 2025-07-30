import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/my-sessions")
      .then((res) => setSessions(res.data))
      .catch(() => toast.error("Failed to load sessions"))
      .finally(() => setLoading(false));
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white shadow-md border rounded-xl p-4 animate-pulse space-y-3">
      <div className="h-5 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-100 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🌿 My Wellness Sessions</h1>

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
              className="bg-white shadow-md hover:shadow-lg transition-shadow border rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{session.title}</h2>
                <p className="text-sm text-gray-500 mb-2 italic">{session.tags.join(", ")}</p>

                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full font-medium mb-2 ${
                    session.status === "draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {session.status.toUpperCase()}
                </span>

                <div>
                  <a
                    href={session.json_file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    📄 View JSON
                  </a>
                </div>
              </div>

              {session.status === "draft" && (
                <button
                  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-md self-start"
                  onClick={() => navigate(`/editor/${session._id}`)}
                >
                  ✏️ Edit Draft
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
