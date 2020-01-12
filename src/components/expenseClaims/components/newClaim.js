import React, { useEffect } from "react";
import { kea, useActions, useValues } from "kea";

const logic = kea({
  actions: () => ({
    addClaim: newClaim => ({ newClaim })
  }),

  reducers: ({ actions }) => ({
    newClaim: [
      {
        name: "",
        date: "",
        description: "",
        amount: "",
        status: "pending"
      },
      {
        [actions.addClaim]: (state, payload) => payload.newClaim
      }
    ]
  })
});

const names = ["Carl", "Mark", "Jack"];

const NewClaim = ({ onAddClaim, onUpdateClaim, data }) => {
  const { newClaim } = useValues(logic);
  const { addClaim } = useActions(logic);

  useEffect(() => {
    console.log("data", data);
    data && addClaim(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <select
        value={newClaim.name}
        onChange={e => addClaim({ ...newClaim, name: e.target.value })}
      >
        <option value="" selected disabled hidden>
          Choose name
        </option>
        {names.map(name => (
          <option value={name}>{name}</option>
        ))}
      </select>
      <input
        type="date"
        name="date"
        value={newClaim.date}
        onChange={e => addClaim({ ...newClaim, date: e.target.value })}
      />
      <input
        type="text"
        name="description"
        value={newClaim.description}
        onChange={e => addClaim({ ...newClaim, description: e.target.value })}
      />
      <input
        type="number"
        name="amount"
        value={newClaim.amount}
        onChange={e => addClaim({ ...newClaim, amount: e.target.value })}
      />
      <button
        className="btn"
        type="button"
        onClick={() => {
          data ? onUpdateClaim(newClaim) : onAddClaim(newClaim);
        }}
      >
        {data ? "Update" : "Add"}
      </button>
    </div>
  );
};
export default NewClaim;
