import { useState, useEffect } from "react";

const PlayerForm = ({ onSubmit, initialData = {}, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    matchesPlayed: "",
    goals: "",
    assists: "",
    rating: "",
    marketValue: "",
  });

  useEffect(() => {
    if (initialData._id) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {initialData._id ? "Edit Player" : "Add Player"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input input-bordered w-full" required />
          <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" className="input input-bordered w-full" required />
          <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" className="input input-bordered w-full" required />
          <input name="matchesPlayed" type="number" value={formData.matchesPlayed} onChange={handleChange} placeholder="Matches Played" className="input input-bordered w-full" required />
          <input name="goals" type="number" value={formData.goals} onChange={handleChange} placeholder="Goals" className="input input-bordered w-full" required />
          <input name="assists" type="number" value={formData.assists} onChange={handleChange} placeholder="Assists" className="input input-bordered w-full" required />
          <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Rating" className="input input-bordered w-full" required />
          <input name="marketValue" type="number" value={formData.marketValue} onChange={handleChange} placeholder="Market Value" className="input input-bordered w-full" required />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {initialData._id ? "Update" : "Add"}
            </button>
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PlayerForm;