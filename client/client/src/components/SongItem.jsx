import { useMutation } from "@apollo/client";
import { DELETE_SONG, GET_SONGS } from "../queries/queries";
import { Link } from "react-router";

export default function SongItem({ song }) {
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: GET_SONGS }],
  });
  function handleDelete(id) {
    deleteSong({ variables: { id } });
  }
  return (
    <li key={song.id} className="collection-item">
      <Link to={`/songs/${song.id}`}>{song.title}</Link>
      <i className="material-icons" onClick={() => handleDelete(song.id)}>
        delete
      </i>
    </li>
  );
}
