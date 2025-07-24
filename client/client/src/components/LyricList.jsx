import { useMutation } from "@apollo/client";
import { LIKE_LYRIC } from "../queries/queries";

export default function LyricList({ lyrics }) {
  const [mutationFn] = useMutation(LIKE_LYRIC);

  function handleClick(id, likes) {
    mutationFn({
      variables: { id },
      optimisticResponse: {
        likeLyric: {
          id: "68819a04385ca80cd3512109",
          likes: likes + 1,
          __typename: "LyricType",
        },
      },
    });
  }

  return (
    <ul className="collection">
      {lyrics.map((lyric) => (
        <li key={lyric.id} className="collection-item">
          {lyric.content}
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <i
              className="material-icons"
              onClick={() => handleClick(lyric.id, lyric.likes)}
            >
              thumb_up
            </i>
            {lyric.likes}
          </span>
        </li>
      ))}
    </ul>
  );
}
