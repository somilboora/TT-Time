export const mockMatchesHistory = [
  { id: 1, created_at: new Date().toISOString(), is_doubles: false, winner_id1: { username: 'B Cran' }, loser_id1: { username: 'Ethan C' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 18 },
  { id: 2, created_at: new Date(Date.now() - 86400000).toISOString(), is_doubles: false, winner_id1: { username: 'Arpy (Supreme) Mukhopadhyay' }, loser_id1: { username: 'Joseph Zola' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 14 },
  { id: 3, created_at: new Date(Date.now() - 186400000).toISOString(), is_doubles: true, winner_id1: { username: 'William Moore' }, winner_id2: { username: 'Alex Minuzzo' }, loser_id1: { username: 'Ethan C' }, loser_id2: { username: 'Joseph Zola' }, winner_score: 21, loser_score: 19 },
  { id: 4, created_at: new Date(Date.now() - 286400000).toISOString(), is_doubles: false, winner_id1: { username: 'Somil Boora' }, loser_id1: { username: 'William Moore' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 9 },
  { id: 5, created_at: new Date(Date.now() - 386400000).toISOString(), is_doubles: false, winner_id1: { username: 'Ryan Campbell' }, loser_id1: { username: 'MM' }, winner_id2: null, loser_id2: null, winner_score: 22, loser_score: 20 },
  { id: 6, created_at: new Date(Date.now() - 486400000).toISOString(), is_doubles: true, winner_id1: { username: 'B Cran' }, winner_id2: { username: 'Ryan Campbell' }, loser_id1: { username: 'Arpy (Supreme) Mukhopadhyay' }, loser_id2: { username: 'Somil Boora' }, winner_score: 21, loser_score: 17 },
  { id: 7, created_at: new Date(Date.now() - 586400000).toISOString(), is_doubles: false, winner_id1: { username: 'Ethan C' }, loser_id1: { username: 'Subra Narayan' }, winner_id2: null, loser_id2: null, winner_score: 21, loser_score: 11 },
] as any;

export const mockProfilesLeaderboard = [
  { id: '1', username: 'Ethan C', elo_rating: 1200, win_streak: 3 },
  { id: '2', username: 'Joseph Zola', elo_rating: 1150, win_streak: 2 },
  { id: '3', username: 'Alex Minuzzo', elo_rating: 900, win_streak: 0 },
  { id: '4', username: 'Arpy (Supreme) Mukhopadhyay', elo_rating: 1300, win_streak: 5 },
  { id: '5', username: 'William Moore', elo_rating: 1050, win_streak: 1 },
  { id: '6', username: 'Somil Boora', elo_rating: 1250, win_streak: 0 },
  { id: '7', username: 'B Cran', elo_rating: 1400, win_streak: 10 },
  { id: '8', username: 'Subra Narayan', elo_rating: 980, win_streak: 2 },
  { id: '9', username: 'Ryan Campbell', elo_rating: 1350, win_streak: 0 },
  { id: '10', username: 'MM', elo_rating: 1280, win_streak: 4 },
  { id: '11', username: 'Glizzy Goblin (Nathan)', elo_rating: 901, win_streak: 0 },
  { id: '12', username: 'D Low', elo_rating: 875, win_streak: 0 },
].sort((a, b) => b.elo_rating - a.elo_rating) as any;

export const mockMatchesLeaderboard = [
  { winner_id1: '7', loser_id1: '1', winner_id2: null, loser_id2: null }, 
  { winner_id1: '4', loser_id1: '2', winner_id2: null, loser_id2: null },
  { winner_id1: '4', loser_id1: '3', winner_id2: null, loser_id2: null },
  { winner_id1: '6', loser_id1: '5', winner_id2: null, loser_id2: null },
  { winner_id1: '1', loser_id1: '5', winner_id2: null, loser_id2: null },
  { winner_id1: '9', loser_id1: '10', winner_id2: null, loser_id2: null },
  { winner_id1: '8', loser_id1: '4', winner_id2: null, loser_id2: null },
  { winner_id1: '10', loser_id1: '2', winner_id2: null, loser_id2: null },
  { winner_id1: '7', loser_id1: '9', winner_id2: null, loser_id2: null },
  { winner_id1: '1', loser_id1: '8', winner_id2: null, loser_id2: null },
  { winner_id1: '5', loser_id1: '3', winner_id2: null, loser_id2: null },
  { winner_id1: '7', loser_id1: '6', winner_id2: null, loser_id2: null },
  { winner_id1: '11', loser_id1: '12', winner_id2: null, loser_id2: null },
] as any;

export const mockProfilesAddMatch = [
  { id: '1', username: 'Ethan C' },
  { id: '2', username: 'Joseph Zola' },
  { id: '3', username: 'Alex Minuzzo' },
  { id: '4', username: 'Arpy (Supreme) Mukhopadhyay' },
  { id: '7', username: 'B Cran' },
] as any;
