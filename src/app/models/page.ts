import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  meta_title: String,
  meta_description: String,
  keywords: [String]
}, { timestamps: true });

export default mongoose.models.Page || mongoose.model('Page', pageSchema);