import Snippet from "../models/Snippet.js";

export const createSnippet = async (req, res) => {
  try{
     const snippet = await Snippet.create({
    ...req.body,
    createdBy: req.user._id,
    collection: req.body.collection || null,
  });
  res.json(snippet);
  }
  catch(err){
    res.status(400).json({message: "Error creating snippet", error: err.message});
  }
 
};

export const getSnippets = async (req, res) => {
  const { language, tags, q, visibility, collection } = req.query;

  const filter = {};

  if (visibility) filter.visibility = visibility;
  if (language) filter.language = language;
  if (tags) filter.tags = { $in: tags.split(",") };
  if (q) filter.title = { $regex: q, $options: "i" };
  if (collection) filter.collection = collection;

  const snippets = await Snippet.find(filter)
    .populate("createdBy", "username")
    .populate("collection", "name");
  res.json(snippets);
};

export const getSnippet = async (req, res) => {
  const snippet = await Snippet.findById(req.params.id)
    .populate("createdBy", "username")
    .populate("collection", "name");
  res.json(snippet);
};

export const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    // Ensure both createdBy and req.user exist
    if (!snippet.createdBy || !req.user || !req.user._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (snippet.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your snippet" });
    }

    // Only update allowed fields
    const { title, code, language } = req.body;
    if (title !== undefined) snippet.title = title;
    if (code !== undefined) snippet.code = code;
    if (language !== undefined) snippet.language = language;

    await snippet.save();
    res.json(snippet);
  } catch (err) {
    console.error("Error updating snippet:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    // Ensure both snippet.createdBy and req.user exist
    if (!snippet.createdBy || !req.user || !req.user._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (snippet.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your snippet" });
    }

    await snippet.deleteOne(); // modern alternative to .remove()
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting snippet:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const forkSnippet = async (req, res) => {
  const original = await Snippet.findById(req.params.id);

  const newSnippet = await Snippet.create({
    title: original.title + " (Forked)",
    code: original.code,
    language: original.language,
    tags: original.tags,
    createdBy: req.user._id,
    visibility: "private",
    collection: original.collection || null,
  });

  res.json(newSnippet);
};