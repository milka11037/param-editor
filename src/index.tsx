import React, { useState } from "react";
import ReactDOM from "react-dom/client";

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(() =>
    params.map((param) => ({
      paramId: param.id,
      value: model.paramValues.find((v) => v.paramId === param.id)?.value || "",
    }))
  );

  const handleChange = (paramId: number, newValue: string) => {
    setParamValues((prevValues) =>
      prevValues.map((p) => (p.paramId === paramId ? { ...p, value: newValue } : p))
    );
  };

  const getModel = (): Model => ({ paramValues });

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      {params.map((param) => (
        <div key={param.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px", width: "100px" }}>
            {param.name}
          </label>
          <input
            type="text"
            value={paramValues.find((p) => p.paramId === param.id)?.value || ""}
            onChange={(e) => handleChange(param.id, e.target.value)}
            style={{
              flex: 1,
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
      ))}
      <button onClick={() => console.log(getModel())} style={{ padding: "8px 12px", marginTop: "10px", cursor: "pointer" }}>
        Log Model
      </button>
    </div>
  );
};

// Sample data
const params: Param[] = [
  { id: 1, name: "Назначение" },
  { id: 2, name: "Длина" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

const App = () => <ParamEditor params={params} model={model} />;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
