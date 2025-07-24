import { gql } from "@apollo/client";

export const ADD_SONG = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export const GET_SONG = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($songId: ID!, $content: String!) {
    addLyricToSong(songId: $songId, content: $content) {
      id
    }
  }
`;

export const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
