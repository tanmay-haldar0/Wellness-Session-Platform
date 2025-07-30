import Session from "../models/Session.js";

// Public sessions
export const getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: "published" }).sort({ created_at: -1 });
  res.json(sessions);
};

// User's own sessions
export const getUserSessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id }).sort({ updated_at: -1 });
  res.json(sessions);
};

// Single session
export const getSessionById = async (req, res) => {
  const session = await Session.findOne({
    _id: req.params.id,
    user_id: req.user.id
  });
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
};

// Save or update session draft
export const saveDraft = async (req, res) => {
  const { id, title, tags, json_file_url, session_date, description } = req.body;

  const formattedTags = Array.isArray(tags)
    ? tags.map((t) => t.trim())
    : (tags || "").split(",").map((t) => t.trim());

  const data = {
    title,
    tags: formattedTags,
    json_file_url,
    status: "draft",
    user_id: req.user.id,
    updated_at: new Date(),
    session_date : session_date,
    description: description
  };

  try {
    let session;
    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        data,
        { new: true }
      );
    } else {
      session = await Session.create(data);
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Publish session
export const publishSession = async (req, res) => {
  const { id } = req.body;
  const session = await Session.findOneAndUpdate(
    { _id: id, user_id: req.user.id },
    { status: "published", updated_at: new Date() },
    { new: true }
  );
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
};
