import { useMutation } from "@apollo/client";
import { useParams } from "react-router";
import { ADD_LYRIC_TO_SONG, GET_SONG } from "../queries/queries";

export default function LyricCreate() {
  const { id } = useParams();
  const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG, {
    refetchQueries: [{ query: GET_SONG, variables: { id } }],
  });
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const content = fd.get("lyric");
    if (!id || !content) return;
    addLyricToSong({ variables: { songId: id, content } }).then(() =>
      e.target.reset()
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="lyric">Add a Lyric</label>
      <input type="text" id="lyric" name="lyric" />
    </form>
  );
}
