import { Link, useParams } from "react-router";
import { GET_SONG } from "../queries/queries";
import { useQuery } from "@apollo/client";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";
export default function SongDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SONG, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const song = data.song;

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate />
    </div>
  );
}
