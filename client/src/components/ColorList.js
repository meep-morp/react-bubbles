import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = e => {
    e.preventDefault();

    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, colorToAdd)
      .then(res => {
        setAdding(false)
        // console.log(res);
        updateColors(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const saveEdit = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
      .then(res => {
        setEditing(false);
        updateColors(
          colors.map(color => {
            if (color.id === id) {
              return res.data;
            } else return color;
          })
        );
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}>
                x
							</span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
						<input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
						<input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={e => saveEdit(e, colorToEdit.id)}>
              save
						</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <button onClick={() => setAdding(true)}>Add +</button>


      {isAdding
        ? <form onSubmit={addColor}>
          <label>
            color name:
						<input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
						<input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value },
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Done</button>
            <button onClick={() => setAdding(false)}>Cancel</button>
          </div>

        </form>

        : ""
      }
    </div>
  );
};

export default ColorList;
