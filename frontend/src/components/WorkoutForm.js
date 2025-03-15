import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [errorFields, setErrorFields] = useState([]);
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const addWorkout = async (e) => {
    e.preventDefault(); // prevens the default behavior of refreshing a page

    if (!user) {
      setError("로그인되어 있지 않습니다.");
      return;
    }

    const workout = { title, reps, load };
    const response = await fetch("http://localhost:4001/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json(); // https://stackoverflow.com/a/37555432

    if (response.ok) {
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);

      console.log("added the following workout: ", json);

      dispatch({ type: "CREATE_WORKOUT", payload: json });
    } else {
      // console.log(json.errors)
      setErrorFields(json.errors.map(({ field, type }) => field));
      // TODO proper key
      setError(
        json.errors.map(({ field, type }) =>
          type === "required" ? (
            <p key="123">항목을 입력해 주세요.</p>
          ) : (
            <p key="321">올바르지 않은 입력값입니다.</p>
          ),
        ),
      );
    }
  };

  return (
    <form className="create" onSubmit={addWorkout}>
      <h3>운동 추가</h3>

      <label>운동 이름</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={errorFields.includes("title") ? "error" : ""}
      />

      <label>반복 횟수</label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={errorFields.includes("reps") ? "error" : ""}
      />

      <label>중량</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={errorFields.includes("load") ? "error" : ""}
      />

      <button>추가</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
