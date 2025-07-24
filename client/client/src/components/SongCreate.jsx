import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router";
import { ADD_SONG, GET_SONGS } from "../queries/queries.js";

export default function SongCreate() {
  const [addSong, { loading, error }] = useMutation(ADD_SONG, {
    onCompleted: () => {
      navigate("/");
    },
    refetchQueries: [{ query: GET_SONGS }],
    awaitRefetchQueries: true,
  });
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const title = fd.get("title");
    if (!title) return;
    addSong({ variables: { title } });
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Song Title: </label>
        <input id="title" type="text" name="title" />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </form>
    </div>
  );
}
