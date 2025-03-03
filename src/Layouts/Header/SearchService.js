const searchService = (data, query) => {
    const searchQuery = query.toLowerCase().trim();
    
    if (!searchQuery) {
      return {
        songs: [],
        artists: []
      };
    }
  
    // Tìm bài hát
    const filteredSongs = data.songs.filter(song => 
      song.name.toLowerCase().includes(searchQuery)
    );
    
    // Tìm ca sĩ
    const filteredArtists = data.artists.filter(artist => 
      artist.name.toLowerCase().includes(searchQuery)
    );
    
    return {
      songs: filteredSongs,
      artists: filteredArtists
    };
  };
  
  export default searchService;