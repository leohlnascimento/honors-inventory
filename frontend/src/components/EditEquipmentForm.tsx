import React, { useState } from "react";
import { updateEquipment } from "../api/equipmentApi";
import { Equipment, Location } from "../types";

interface Props {
  equipment: Equipment;
  onClose: () => void;
  onUpdate: (updated: Equipment) => void;
}

const EditEquipmentForm: React.FC<Props> = ({ equipment, onClose, onUpdate }) => {
  const [model, setModel] = useState(equipment.model);
  const [equipmentType, setEquipmentType] = useState(equipment.equipment_type);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateEquipment(equipment.id, {
        model,
        equipment_type: equipmentType,
        location_id: equipment.location_id, // keep current location
      });
      onUpdate({ ...equipment, model, equipment_type: equipmentType });
      onClose();
    } catch (err) {
      setError("Failed to update equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h4>Edit Equipment</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Model:</label>
        <input value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <div>
        <label>Type:</label>
        <input value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </form>
  );
};

export default EditEquipmentForm;
