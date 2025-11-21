import Collection from "../models/Collection.js";

export const createCollection = async (req, res) => {
  const collection = await Collection.create({
    ...req.body,
    owner: req.user._id,
  });
  res.json(collection);
};

// In collectionController.js
export const getCollections = async (req, res) => {
  const collections = await Collection.find({ createdBy: req.user._id })
    .populate({
      path: "snippets",
      populate: { path: "createdBy", select: "username" },
    });
  res.json(collections);
};

export const updateCollection = async (req, res) => {
  const collection = await Collection.findById(req.params.id);

  if (collection.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed" });

  Object.assign(collection, req.body);
  await collection.save();

  res.json(collection);
};

export const deleteCollection = async (req, res) => {
  const collection = await Collection.findById(req.params.id);

  if (collection.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed" });

  await collection.remove();
  res.json({ message: "Collection removed" });
};
