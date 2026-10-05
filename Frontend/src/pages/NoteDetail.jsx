import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        console.log(res);

        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching SideQuest", error);
        toast.error("Failed to fetch the SideQuest");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async() => {
    if(!window.confirm("Are you sure ypu want to delete this SideQuest?")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("SideQuest deleted");
      navigate("/")
    } catch (error) {
      console.log("Error Deleting", error);
      toast.error("Failed to delete SideQuest")
    }
    finally{

    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content")
      return;
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`,note)
      toast.success("SideQuest updated Successfully")
      navigate("/")
    } catch (error) {
      console.log("Error saving the notes:",error);
      toast.error("Failed to update note")
    }
    finally{
      setSaving(false)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to SideQuests
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Notes
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                  <label className="mb-2 block">
                    <span className="label-text">SideQuest</span>
                  </label>
                  <input
                  type="text"
                  placeholder="SideQuest Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}
                  />
              </div>

              <div className="form-control mb-4">
                  <label className="mb-2 block">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                  placeholder="Write your SideQuest here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({...note, content: e.target.value})}
                  />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes" }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
