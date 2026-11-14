import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const API_URL = "https://6af79d699bdd097c326e2b19.mockapi.io/tasks";

  //
  async function addTask() {
    const newTask = {
      title: task,
      completed: false,
    };
    if (!task.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    console.log(data);

    setTasks((prev) => [...prev, data]);
    setTask("");
  }

  //
  async function getTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    setTasks(data);
  }

  //
  useEffect(() => {
    getTasks();
  }, []);
  //
  function checkStatus(id) {
    setTasks((prev) =>
      prev.map((eachElement) => {
        if (eachElement.id === id) {
          return {
            ...eachElement,
            completed: !eachElement.completed,
          };
        }
        return eachElement;
      }),
    );
  }
  //

  async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    setTasks((prev) => prev.filter((eachElement) => eachElement.id !== id));
    if (!response.ok) return;
  }
  //

  console.log(tasks);

  return (
    <div className=" min-h-screen bg-mauve-800 w-full ">
      <div className="w-full max-w-[1440px] mx-auto flex justify-center gap-2 relative -top-[25px] z-10">
        <input
          className="w-[736px] h-[50px]  bg-[#808080] px-4 rounded-xl border-black"
          type="text"
          placeholder="Add a new task"
          onChange={(event) => setTask(event.target.value)}
          value={task}
        />
        <button
          onClick={addTask}
          className="w-21 h-13 bg-[#1E6F9F] rounded-[4px] flex items-center justify-center flex-row-reverse gap-1 text-white font-bold x-2 "
        >
          <CiCirclePlus size={30} className="text-white" />
          Add
        </button>
      </div>

      <div className="max-w-[736px]  mx-auto border">
        <div className="flex justify-between">
          <h2 className="text-[#4EA8DE] font-bold">
            Task created {tasks.length}
          </h2>
          <span className="text-[#8284FA] font-bold  flex">
            Completed
            <span className="pl-2.5">
              {
                tasks.filter((eachElement) => eachElement.completed === true)
                  .length
              }
            </span>
          </span>
        </div>

        {tasks.map((eachElement, index) => (
          <div
            key={eachElement.id}
            className="bg-[#333333] w-full h-18 text-white text-[14px] flex items-center  pl-[52px] gap-4 justify-between"
          >
            <div className="flex items-center justify-center gap-4">
              <input
                className="w-6 h-6 bg-[#4EA8DE] "
                type="checkbox"
                checked={eachElement.completed}
                onChange={() => checkStatus(eachElement.id)}
              />
              <span
                className={
                  eachElement.completed
                    ? "line-through text-gray-500"
                    : "text-white"
                }
              >
                {eachElement.title}
              </span>
            </div>
            <MdDelete
              onClick={() => deleteTask(eachElement.id)}
              className="text-[#808080] mr-6"
              size={25}
              height={14}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
