import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

export default function SessionEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [tags, setTags] = useState([]); // store as array
  const [tagInput, setTagInput] = useState("");
  const [jsonFileUrl, setJsonFileUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/my-sessions/${id}`).then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description || "");
        setSessionDate(res.data.session_date || "");
        setTags(res.data.tags || []);
        setJsonFileUrl(res.data.json_file_url);
      });
    }
  }, [id]);

  const handleManualSave = async () => {
    try {
      const res = await API.post("/my-sessions/save-draft", {
        id,
        title,
        description,
        session_date: sessionDate,
        tags,
        json_file_url: jsonFileUrl,
      });

      const newId = res.data._id;
      toast.success("Draft saved");

      if (!id && newId) {
        navigate(`/editor/${newId}`, { replace: true });
      }
    } catch (error) {
      console.error("Manual save failed:", error);
      toast.error("Failed to save draft.");
    }
  };

  const saveDraft = useCallback(
    debounce(handleManualSave, 1500),
    [id, title, description, sessionDate, tags, jsonFileUrl]
  );

  useEffect(() => {
    if (title || description || sessionDate || tags.length || jsonFileUrl) {
      saveDraft();
    }
    return () => saveDraft.cancel();
  }, [title, description, sessionDate, tags, jsonFileUrl]);

  const handlePublish = async () => {
    if (!id) {
      toast.error("Please save the draft first.");
      return;
    }

    try {
      await API.post("/my-sessions/publish", { id });
      toast.success("Session published!");
      navigate("/my-sessions");
    } catch {
      toast.error("Publish failed!");
    }
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const splitTags = value.split(",").map((t) => t.trim()).filter(Boolean);
      setTags((prev) => [...prev, ...splitTags]);
      setTagInput("");
    } else {
      setTagInput(value);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen mt-12 flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-xl bg-white border shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">✍️ Session Editor</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter session title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter session description"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="w-full px-4 py-2 border rounded-md flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-blue-400">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-blue-500 hover:text-blue-700 text-xs font-bold"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className="flex-grow outline-none text-sm py-1"
              value={tagInput}
              onChange={handleTagInput}
              placeholder="Type and press comma"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">JSON File URL</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={jsonFileUrl}
            onChange={(e) => setJsonFileUrl(e.target.value)}
            placeholder="https://example.com/file.json"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition"
            onClick={handleManualSave}
          >
            💾 Save as Draft
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            onClick={handlePublish}
          >
            📤 Publish
          </button>
        </div>
      </div>
    </div>
  );
}
