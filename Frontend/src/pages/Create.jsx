import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";


const Create = () => {
  const [title,setTitle] = useState("");
  const [content, setContent] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }

    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("SideQuest created Successfully!")
      navigate("/")
      
    } catch (error) {
      console.log("Error creating SideQuest",error);
      if(error.response.status === 429){
        toast.error("Slow down! You're creating too many SideQuests", {
          duration : 4000,
          icon : "💀",
        })
      }
      else{
        toast.error("Failed to create SideQuest")
      }
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/>
          Back to SideQuests
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4"> Create New SideQuest </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="mb-2 block">
                    <span className="label-text">SideQuest</span>
                  </label>
                  <input type="text"
                  placeholder="SideQuest Title"
                  className="input input-bordered"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="mb-2 block">
                    <span className="label-text">Content</span>
                  </label>
                  <input type="text"
                  placeholder="Write your SideQuest here..."
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Create SideQuest"}</button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Create