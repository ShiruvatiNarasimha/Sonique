"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Music, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SoniqueDashboard() {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      likes: 10,
      dislikes: 2,
    },
    { id: 2, title: "Imagine", artist: "John Lennon", likes: 8, dislikes: 1 },
    {
      id: 3,
      title: "Shape of You",
      artist: "Ed Sheeran",
      likes: 7,
      dislikes: 3,
    },
  ]);
  const [newSong, setNewSong] = useState({ title: "", artist: "" });

  const addSong = () => {
    if (!newSong.title || !newSong.artist) return;
    setSongs([...songs, { id: Date.now(), ...newSong, likes: 0, dislikes: 0 }]);
    setNewSong({ title: "", artist: "" });
  };

  interface Song {
    id: number;
    title: string;
    artist: string;
    likes: number;
    dislikes: number;
  }

  const likeSong = (id: number) => {
    setSongs(
      songs.map((song) =>
        song.id === id ? { ...song, likes: song.likes + 1 } : song
      )
    );
  };

  const dislikeSong = (id: number) => {
    setSongs(
      songs.map((song: Song) =>
        song.id === id ? { ...song, dislikes: song.dislikes + 1 } : song
      )
    );
  };

  const sharePage = () => alert("Share feature coming soon!");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 flex flex-col items-center">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6 bg-gray-800/90 backdrop-blur-lg border border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-green-400">
              Sonique Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Input
                placeholder="Song Title"
                value={newSong.title}
                onChange={(e) =>
                  setNewSong({ ...newSong, title: e.target.value })
                }
                className="flex-grow bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 px-4 py-2 rounded-lg"
              />
              <Input
                placeholder="Artist"
                value={newSong.artist}
                onChange={(e) =>
                  setNewSong({ ...newSong, artist: e.target.value })
                }
                className="flex-grow bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 px-4 py-2 rounded-lg"
              />
              <Button
                onClick={addSong}
                className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg shadow-md"
              >
                <Plus className="mr-2 h-5 w-5" /> Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/90 backdrop-blur-lg border border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400">
              Song Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {songs.map((song) => (
                <motion.li
                  key={song.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-700/50 p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center mb-2 sm:mb-0">
                    <Music className="mr-2 h-6 w-6 text-green-400" />
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {song.title}
                      </h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => likeSong(song.id)}
                      className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg"
                    >
                      <ThumbsUp className="mr-1 h-5 w-5" /> {song.likes}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dislikeSong(song.id)}
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg"
                    >
                      <ThumbsDown className="mr-1 h-5 w-5" /> {song.dislikes}
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button
          onClick={sharePage}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          <Share2 className="mr-2 h-5 w-5" /> Share This Page
        </Button>
      </motion.div>
    </div>
  );
}
