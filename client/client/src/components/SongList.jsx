import { useQuery } from "@apollo/client";
import { Link } from "react-router";
import { GET_SONGS } from "../queries/queries";
import SongItem from "./SongItem";

export default function SongList() {
  const { loading, error, data } = useQuery(GET_SONGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul className="collection">
        {data.songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
}
